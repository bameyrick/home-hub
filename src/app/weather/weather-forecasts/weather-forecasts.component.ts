import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEqual } from '@qntm-code/utils';
import { distinctUntilChanged, shareReplay, switchMap } from 'rxjs';
import { ComponentAbstract } from '../../abstracts';
import { TimeService } from '../../time/time.service';
import { selectForecastLocations } from '../store';

@Component({
  selector: 'home-hub-weather-forecasts',
  templateUrl: './weather-forecasts.component.html',
  styleUrls: ['./weather-forecasts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherForecastsComponent extends ComponentAbstract {
  public readonly forecastLocations$ = this.timeService.now$.pipe(
    switchMap(now => this.store.select(selectForecastLocations(now))),
    distinctUntilChanged((a, b) => isEqual(a, b)),
    shareReplay(1)
  );

  constructor(element: ElementRef, private readonly store: Store, private readonly timeService: TimeService) {
    super(element);
  }
}
