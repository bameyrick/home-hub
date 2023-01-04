import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { isNullOrUndefined } from '@qntm-code/utils';
import { combineLatest, filter, map } from 'rxjs';
import { ComponentAbstract } from '../abstracts';
import { TimeService } from '../time/time.service';
import { selectCurrentWeather } from './store';

@Component({
  selector: 'home-hub-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent extends ComponentAbstract {
  public readonly currentWeather$ = this.store.select(selectCurrentWeather);

  private readonly nightColour = `#102530`;

  private readonly dayColour = `##77B4CD`;

  private readonly overcastDayColour = `#B4CDD9`;

  public readonly background$ = combineLatest([this.timeService.now$, this.currentWeather$]).pipe(
    filter(([_, weather]) => !isNullOrUndefined(weather)),
    map(([now, { sunrise, sunset, noon, twilightBegin, twilightEnd, weatherCode }]) => {
      if (!twilightBegin || !twilightEnd || !sunrise || !sunset || !noon) {
        return;
      }

      if (now <= twilightBegin || now >= twilightEnd) {
        return this.nightColour;
      }

      return this.dayColour;
    })
  );

  constructor(elementRef: ElementRef, private readonly store: Store, public readonly timeService: TimeService) {
    super(elementRef);
  }
}
