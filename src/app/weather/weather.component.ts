import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ComponentAbstract } from '../abstracts';
import { TimeService } from '../time/time.service';
import { selectCurrentWeather } from './store';

@Component({
  selector: 'home-hub-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent extends ComponentAbstract {
  public readonly currentWeather$ = this.timeService.now$.pipe(switchMap(now => this.store.select(selectCurrentWeather(now))));

  constructor(elementRef: ElementRef, private readonly store: Store, public readonly timeService: TimeService) {
    super(elementRef);
  }
}
