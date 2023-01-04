import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentAbstract } from '../../abstracts';
import { selectCurrentWeather } from '../store';

@Component({
  selector: 'home-hub-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherNowComponent extends ComponentAbstract {
  public readonly currentWeather$ = this.store.select(selectCurrentWeather);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
