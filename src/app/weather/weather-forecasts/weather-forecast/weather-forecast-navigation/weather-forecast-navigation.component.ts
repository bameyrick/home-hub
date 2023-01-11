import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { getStartOfDay, isNullOrUndefined } from '@qntm-code/utils';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, ReplaySubject } from 'rxjs';
import { ComponentAbstract } from '../../../../abstracts';
import { TimeService } from '../../../../time/time.service';
import { WeatherForecastLocation } from '../../../models';

@Component({
  selector: 'home-hub-weather-forecast-navigation',
  templateUrl: './weather-forecast-navigation.component.html',
  styleUrls: ['./weather-forecast-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherForecastNavigationComponent extends ComponentAbstract implements OnChanges {
  protected readonly baseClassName = 'WeatherForecastNavigation';

  @Input() public location?: WeatherForecastLocation;

  @Input() public currentDay?: string | null;

  @Output() public readonly currentDayChange = new EventEmitter<string>();

  public readonly today$ = this.timeService.now$.pipe(map(now => getStartOfDay(now).getTime().toString()));

  public readonly currentDay$ = new BehaviorSubject<string | null>(null);

  private readonly availableDays$ = new ReplaySubject<string[]>(1);

  constructor(elementRef: ElementRef, public readonly timeService: TimeService) {
    super(elementRef);

    this.subscriptions.add(
      combineLatest([this.availableDays$, this.today$, this.currentDay$])
        .pipe(
          distinctUntilChanged(),
          filter(([availableDays, today, currentDay]) => {
            if (!currentDay || currentDay < today) {
              return true;
            }

            return !availableDays.includes(currentDay);
          })
        )
        .subscribe(([availableDays]) => this.currentDay$.next(availableDays[0]))
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !isNullOrUndefined(this.location)) {
      this.availableDays$.next(Object.keys(this.location.days));
    }

    if (changes['currentDay'] && !isNullOrUndefined(this.currentDay)) {
      this.currentDay$.next(this.currentDay);
    }
  }

  public setCurrentDay(day: string): void {
    this.currentDay$.next(day);

    this.currentDayChange.emit(day);
  }
}
