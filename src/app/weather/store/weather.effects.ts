import { Injectable } from '@angular/core';
import { ForecastedHour, ForecastLocation } from '@home-hub/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getEndOfDay, getStartOfDay, getStartOfHour, getStartOfMinute, isEqual } from '@qntm-code/utils';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { weatherCodeToAnimatedWeatherType } from '../helpers';
import { CurrentWeather, WeatherForecastDay, WeatherForecastDays, WeatherForecastLocation } from '../models';
import { WeatherActions } from './weather.actions';
import { selectCurrentWeather, selectFirstWeatherLocation, selectForecastLocations, selectWeatherLocations } from './weather.selectors';

@Injectable()
export class WeatherEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  public readonly weatherUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.weatherUpdated, WeatherActions.generateForecasts),
      switchMap(() =>
        this.store.select(selectWeatherLocations).pipe(
          map(locations => {
            const now = getStartOfHour();

            return locations?.map(location => this.createLocationForecast(location, now)) || [];
          }),
          withLatestFrom(this.store.select(selectForecastLocations)),
          filter(([a, b]) => !isEqual(a, b)),
          map(([locationForecasts]) => WeatherActions.forecastsGenerated({ locationForecasts }))
        )
      )
    )
  );

  public readonly generateCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.weatherUpdated, WeatherActions.generateCurrentWeather),
      switchMap(() =>
        this.store.select(selectFirstWeatherLocation).pipe(
          map(location => this.createCurrentWeather(location)),
          withLatestFrom(this.store.select(selectCurrentWeather)),
          filter(([a, b]) => !isEqual(a, b)),
          map(([currentWeather]) => WeatherActions.currentWeatherGenerated({ currentWeather }))
        )
      )
    )
  );

  private createCurrentWeather(location?: ForecastLocation): CurrentWeather | undefined {
    const now = getStartOfMinute();
    const hour = location?.hourly.find(hour => isEqual(getStartOfHour(hour.time), getStartOfHour(now)));

    const result: CurrentWeather | undefined =
      hour && location
        ? {
            ...hour,
            sunrise: hour.sunrise,
            sunset: hour.sunset,
            noon: hour.noon,
            twilightBegin: hour.twilightBegin,
            twilightEnd: hour.twilightEnd,
            updated: location.modelRunDate,
            name: location.locationName,
          }
        : undefined;

    return result;
  }

  private createLocationForecast(location: ForecastLocation, now: Date): WeatherForecastLocation {
    const lastHourlyTime = location.hourly[location.hourly.length - 1].time;

    const hours = [...location.hourly, ...location.threeHourly.filter(hour => hour.time > lastHourlyTime)].filter(
      item => item.time >= getStartOfHour(now)
    );

    const days = this.createLocationDays(hours, now);

    const navigationDayDivider = Object.keys(days).length + 1;

    const result: WeatherForecastLocation = {
      name: location.locationName,
      days,
      totalHours: hours.length,
      updated: location.modelRunDate,
      flexBasis: `${(1 / navigationDayDivider) * 100}%`,
      flexBasisCurrent: `${(2 / navigationDayDivider) * 100}%`,
    };

    return result;
  }

  private createLocationDays(hours: ForecastedHour[], now: Date): WeatherForecastDays {
    const days = hours.reduce((result, hour) => {
      const day = getStartOfDay(hour.time).getTime();

      if (!result[day]) {
        result[day] = this.createForecastDay(
          hours.filter(hour => hour.time.getTime() >= day && hour.time <= getEndOfDay(new Date(day))),
          now
        );
      }

      return result;
    }, {} as WeatherForecastDays);

    return days;
  }

  private createForecastDay(hours: ForecastedHour[], now: Date): WeatherForecastDay {
    const { sunrise, sunset, noon } = hours[0];
    const temperatures = hours.map(hour => hour.temperature);
    const weatherHours =
      now < sunset ? hours.filter(hour => hour.time >= sunrise && hour.time <= sunset) : hours.filter(hour => hour.time > now);
    const weatherCodes = weatherHours
      .map(hour => hour.weatherCode)
      .reduce(
        (result, code) => {
          const type = weatherCodeToAnimatedWeatherType(code);

          if (result[type]) {
            result[type].count++;
          } else {
            result[type] = {
              count: 1,
              code,
            };
          }

          return result;
        },
        {} as Record<
          string,
          {
            count: number;
            code: number;
          }
        >
      );

    const maxCount = Math.max(...Object.values(weatherCodes).map(code => code.count));
    const mostCommonWeatherCodes = Object.values(weatherCodes).filter(code => code.count === maxCount);
    const middleWeatherCode = weatherHours[weatherHours.length === 1 ? 0 : Math.round(weatherHours.length / 2)].weatherCode;

    let weatherCode: number = middleWeatherCode;

    if (mostCommonWeatherCodes.length === 1) {
      weatherCode = mostCommonWeatherCodes[0].code ?? middleWeatherCode;
    }

    return {
      hours: hours,
      maxTemp: Math.max(...temperatures),
      minTemp: Math.min(...temperatures),
      sunrise,
      sunset,
      noon,
      weatherCode,
    };
  }
}
