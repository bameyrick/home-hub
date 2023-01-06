import { Injectable } from '@angular/core';
import { ForecastedHour, ForecastLocation } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { map, skip } from 'rxjs';
import { TimeService } from '../time/time.service';
import { WeatherActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly socket: Socket, private readonly store: Store, private readonly timeService: TimeService) {
    this.timeService.currentHour$.pipe(skip(1)).subscribe(() => this.store.dispatch(WeatherActions.generateForecasts()));
  }

  public setupWebsocket(): void {
    this.socket
      .fromEvent<ForecastLocation[]>('weather')
      .pipe(
        map(locations =>
          locations.map(location => ({
            ...location,
            modelRunDate: new Date(location.modelRunDate),
            hourly: location.hourly.map(hour => this.remapDates(hour)),
            threeHourly: location.threeHourly.map(hour => this.remapDates(hour)),
          }))
        )
      )
      .subscribe(locations => this.store.dispatch(WeatherActions.weatherUpdated({ locations })));
  }

  private remapDates(hour: ForecastedHour): ForecastedHour {
    return {
      ...hour,
      time: new Date(hour.time),
      sunrise: new Date(hour.sunrise),
      sunset: new Date(hour.sunset),
      noon: new Date(hour.noon),
      twilightBegin: new Date(hour.twilightBegin),
      twilightEnd: new Date(hour.twilightEnd),
    };
  }
}
