import { AfterViewInit, Component, ElementRef, EventEmitter, Input, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { getStartOfDay } from '@qntm-code/utils';
import { debounceTime, distinctUntilChanged, filter, map, Observable, Subscription } from 'rxjs';
import { sortBy } from 'sort-by-typescript';
import { ComponentAbstract } from '../../../abstracts';
import { TimeService } from '../../../time/time.service';
import { WeatherForecastLocation } from '../../models';
import { WeatherForecastScrollAreaDimensions } from '../weather-forecast-scroll-area-dimensions.model';

@Component({
  selector: 'home-hub-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherForecastComponent extends ComponentAbstract implements AfterViewInit {
  protected readonly baseClassName = 'WeatherForecast';

  @Input() public location?: WeatherForecastLocation;

  @Input() public scrollEvents?: EventEmitter<void>;

  @Input() public scrollAreaDimensions?: WeatherForecastScrollAreaDimensions;

  @ViewChildren('dayHeader') private readonly dayHeaders?: QueryList<ElementRef>;

  public readonly today$ = this.timeService.now$.pipe(map(now => getStartOfDay(now).getTime().toString()));

  public currentDay$?: Observable<string>;

  private scrollingToDay = false;

  private readonly atBoundsOffset = 70;

  private scrollFinishSubscription?: Subscription;

  constructor(elementRef: ElementRef, private readonly timeService: TimeService) {
    super(elementRef);
  }

  public ngAfterViewInit(): void {
    this.currentDay$ = this.scrollEvents?.pipe(
      filter(() => !this.scrollingToDay),
      map(() => this.findScrollCurrentDay()),
      distinctUntilChanged()
    );
  }

  public scrollToDay(day: string): void {
    const element = this.elementRef.nativeElement.querySelector(`[data-day='${day}']`);

    if (element) {
      this.scrollFinishSubscription?.unsubscribe();

      this.scrollingToDay = true;

      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

      this.scrollFinishSubscription = this.scrollEvents
        ?.pipe(
          filter(() => this.scrollingToDay),
          debounceTime(100)
        )
        .subscribe(() => {
          this.scrollingToDay = false;
          this.scrollFinishSubscription?.unsubscribe();
        });
    }
  }

  private findScrollCurrentDay(): string {
    const scrollLeft = this.scrollAreaDimensions?.left ?? 0;
    const scrollRight = this.scrollAreaDimensions?.right ?? 0;

    return this.dayHeaders
      ?.map(element => {
        const { left, right } = element.nativeElement.getBoundingClientRect();

        let width = 0;

        if (
          (left >= scrollLeft - this.atBoundsOffset && left < scrollLeft + this.atBoundsOffset) ||
          (right <= scrollRight + this.atBoundsOffset && right > scrollRight - this.atBoundsOffset)
        ) {
          width = Infinity;
        } else if (right <= scrollRight && right > scrollLeft) {
          width = right;
        } else if (left >= scrollLeft && left < scrollRight && right > scrollRight) {
          width = scrollRight - left;
        } else if (left < scrollLeft && right > scrollRight) {
          width = scrollRight;
        }

        return {
          element,
          width,
        };
      })
      .sort(sortBy('-width'))[0]
      .element.nativeElement.getAttribute('data-day');
  }
}
