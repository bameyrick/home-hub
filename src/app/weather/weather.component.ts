import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppRoute } from '../../models';
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
  protected readonly baseClassName = 'Weather';

  public readonly currentWeather$ = this.store.select(selectCurrentWeather);

  @HostListener('click') public readonly onClick = () => this.router.navigateByUrl(AppRoute.Forecasts);

  constructor(
    elementRef: ElementRef,
    private readonly store: Store,
    public readonly timeService: TimeService,
    private readonly router: Router
  ) {
    super(elementRef);
  }
}
