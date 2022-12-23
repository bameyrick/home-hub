import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentAbstract } from '../abstracts';
import { selectCurrentWeather } from './store';

@Component({
  selector: 'home-hub-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent extends ComponentAbstract {
  public readonly currentWeather$ = this.store.select(selectCurrentWeather);

  constructor(private readonly store: Store) {
    super();
  }
}
