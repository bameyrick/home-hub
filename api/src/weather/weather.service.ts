import { ForecastedHour, ForecastLocation, LatLon, MetOfficeCredentials, SunriseSunset } from '@home-hub/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { convertTimeUnit, getStartOfDay, isEmpty, isEqual, isNullOrUndefined, TimeUnit, unitToMS } from '@qntm-code/utils';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
  filter,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  retry,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { DatabasePersistenceService } from '../database/database.service';
import { MetOfficeFeature, MetOfficeHourlyTimeSeriesItem, MetOfficeResponse } from './models';

@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point';
  private readonly params = '?latitude={lat}&longitude={lng}&includeLocationName=true&excludeParameterMetadata=true';

  private readonly hourlyForecastURL = `${this.baseUrl}/hourly${this.params}`;
  private readonly threeHourlyForecastURL = `${this.baseUrl}/three-hourly${this.params}`;

  /**
   * The update interval in hours
   */
  private readonly updateInterval = 3;

  private readonly weatherLocations$ = this.db.weatherLocations$.pipe(
    filter(
      locations =>
        !isEmpty(locations) && locations.every(location => !isNullOrUndefined(location.latitude) && !isNullOrUndefined(location.longitude))
    ),
    map(locations => locations.sort()),
    distinctUntilChanged((a, b) => isEqual(a, b)),
    tap(() => Logger.log('Weather locations changed'))
  ) as unknown as Observable<Array<LatLon>>;

  private readonly metofficeCredentials$ = this.db.metOfficeCredentials$.pipe(
    filter(credentials => !isNullOrUndefined(credentials)),
    distinctUntilChanged(),
    tap(() => Logger.log('MetOffice credentials changed'))
  ) as unknown as Observable<MetOfficeCredentials>;

  private readonly lastUpdated$ = new BehaviorSubject<Date | null>(null);

  private readonly interval$ = combineLatest([
    this.lastUpdated$,
    timer(0, convertTimeUnit(this.updateInterval, TimeUnit.Hours, TimeUnit.Milliseconds)),
  ]).pipe(
    filter(
      ([lastUpdated]) =>
        isNullOrUndefined(lastUpdated) || new Date(lastUpdated).setHours(lastUpdated.getHours() + this.updateInterval) < Date.now()
    )
  );

  public readonly forecasts$ = combineLatest([this.weatherLocations$, this.metofficeCredentials$, this.interval$]).pipe(
    switchMap(([locations, credentials]) => forkJoin(locations.map(location => this.getForcastsForLocation(location, credentials)))),
    tap(async locations => {
      Logger.log('UPDATED WEATHER');

      this.lastUpdated$.next(locations[0].modelRunDate);

      const dbLocations = await firstValueFrom(this.db.weatherLocations$);

      this.db.weatherLocations$.next(
        dbLocations.map(dbLocation => ({
          ...dbLocation,
          name: locations.find(({ location }) => location.latitude === dbLocation.latitude && location.longitude === dbLocation.longitude)
            ?.locationName,
        }))
      );
    }),
    shareReplay(1)
  );

  constructor(private readonly db: DatabasePersistenceService, private readonly httpService: HttpService) {}

  private getForcastsForLocation(location: LatLon, credentials: MetOfficeCredentials): Observable<ForecastLocation> {
    const hourly = this.getForecast(this.hourlyForecastURL, location, credentials);
    const threeHourly = this.getForecast(this.threeHourlyForecastURL, location, credentials);

    return forkJoin([hourly, threeHourly]).pipe(
      switchMap(([hourly, threeHourly]) =>
        forkJoin(
          Array.from(
            new Set(
              [...hourly.properties.timeSeries, ...threeHourly.properties.timeSeries].map(hour =>
                getStartOfDay(new Date(hour.time)).toISOString()
              )
            )
          ).map(time => this.getSunriseSunsetForLocation(location, new Date(time)))
        ).pipe(
          map(sunriseSunsets => ({
            location,
            actualLocation: this.coordinatesToLatLon(hourly.geometry.coordinates),
            locationName: hourly.properties.location.name,
            requestedPointDistance: hourly.properties.requestPointDistance,
            modelRunDate: new Date(hourly.properties.modelRunDate),
            hourly: this.mapHourlyForcasts(hourly, sunriseSunsets),
            threeHourly: this.mapHourlyForcasts(threeHourly, sunriseSunsets),
          }))
        )
      )
    );
  }

  private mapHourlyForcasts(hourly: MetOfficeFeature, sunriseSunsets: SunriseSunset[]): Array<ForecastedHour> {
    return (hourly.properties.timeSeries as MetOfficeHourlyTimeSeriesItem[]).map(hour => {
      const sunriseSunset = sunriseSunsets.find(
        sunriseSunset => getStartOfDay(sunriseSunset.sunrise).getTime() === getStartOfDay(new Date(hour.time)).getTime()
      );

      if (!sunriseSunset) {
        throw new Error(`Could not find sunrise/sunset for hour: ${hour.time}`);
      }

      return {
        time: new Date(hour.time),
        temperature: hour.screenTemperature || (hour.minScreenAirTemp + hour.maxScreenAirTemp) / 2,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        feelsLikeTemperature: (hour.feelsLikeTemperature || hour.feelsLikeTemp)!,
        windSpeed: hour.windSpeed10m,
        windGust: hour.windGustSpeed10m,
        windDirection: hour.windDirectionFrom10m,
        uvIndex: hour.uvIndex,
        weatherCode: hour.significantWeatherCode,
        precipitationProbability: hour.probOfPrecipitation,
        humidity: hour.screenRelativeHumidity,
        ...sunriseSunset,
      };
    });
  }

  private getForecast(url: string, location: LatLon, credentials: MetOfficeCredentials): Observable<MetOfficeFeature> {
    url = this.replaceParams(url, location);
    return this.httpService
      .get<MetOfficeResponse>(url, {
        headers: {
          accept: 'application/json',
          'x-ibm-client-id': credentials.clientID,
          'x-ibm-client-secret': credentials.clientSecret,
        },
      })
      .pipe(
        retry({ delay: unitToMS(1, TimeUnit.Minutes), count: 10 }),
        map(({ data }) => data.features[0]),
        catchError(error => {
          if (error.response) {
            Logger.error(
              `${error.response.data.httpCode}: Error getting weather forecast for ${
                location.name ?? `${location.latitude},${location.longitude}`
              }. ${error.response.data.moreInformation}. {${url}, GET}`
            );
          } else {
            Logger.error(error);
          }

          return EMPTY;
        })
      );
  }

  private replaceParams(url: string, location: LatLon): string {
    return url.replace('{lat}', location.latitude.toString()).replace('{lng}', location.longitude.toString());
  }

  private coordinatesToLatLon(coordinates: number[]): LatLon {
    return { latitude: coordinates[1], longitude: coordinates[0] };
  }

  private getSunriseSunsetForLocation(location: LatLon, date: Date): Observable<SunriseSunset> {
    return this.httpService
      .get(
        `https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=${location.longitude}&date=${
          date.toISOString().split('T')[0]
        }&formatted=0`
      )
      .pipe(
        retry({ delay: unitToMS(1, TimeUnit.Minutes), count: 10 }),
        map(({ data }) => ({
          sunrise: new Date(data.results.sunrise),
          sunset: new Date(data.results.sunset),
          twilightBegin: new Date(data.results.astronomical_twilight_begin),
          twilightEnd: new Date(data.results.astronomical_twilight_end),
          noon: new Date(data.results.solar_noon),
        }))
      );
  }
}
