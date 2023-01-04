import { Injectable } from '@angular/core';
import { ForecastLocation } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { WeatherActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly socket: Socket, private readonly store: Store) {}

  public setupWebsocket(): void {
    this.socket
      .fromEvent<ForecastLocation[]>('weather')
      .pipe(
        map(locations =>
          locations.map(location => ({
            ...location,
            modelRunDate: new Date(location.modelRunDate),
            hourly: location.hourly.map(hour => ({ ...hour, time: new Date(hour.time) })),
            daily: location.daily.map(day => ({
              ...day,
              date: new Date(day.date),
              sunrise: new Date(day.sunrise),
              sunset: new Date(day.sunset),
              noon: new Date(day.noon),
              twilightBegin: new Date(day.twilightBegin),
              twilightEnd: new Date(day.twilightEnd),
            })),
          }))
        )
      )
      .subscribe(locations => this.store.dispatch(WeatherActions.weatherUpdated({ locations })));
  }
}
