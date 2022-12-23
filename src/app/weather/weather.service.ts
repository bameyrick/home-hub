import { Injectable } from '@angular/core';
import { ForecastLocation } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { WeatherActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly socket: Socket, private readonly store: Store) {}

  public setupWebsocket(): void {
    this.socket
      .fromEvent<ForecastLocation[]>('weather')
      .subscribe(locations => this.store.dispatch(WeatherActions.weatherUpdated({ locations })));
  }
}
