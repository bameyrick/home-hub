import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentAbstract } from '../../abstracts';
import { selectForecastLocations } from '../store';

@Component({
  selector: 'home-hub-weather-forecasts',
  templateUrl: './weather-forecasts.component.html',
  styleUrls: ['./weather-forecasts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherForecastsComponent extends ComponentAbstract {
  public readonly forecastLocations$ = this.store.select(selectForecastLocations);

  constructor(element: ElementRef, private readonly store: Store) {
    super(element);
  }
}
