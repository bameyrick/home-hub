import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from '@qntm-code/utils';
import { ComponentAbstract } from '../../abstracts';
import { selectForecastLocations } from '../store';
import { WeatherForecastScrollAreaDimensions } from './weather-forecast-scroll-area-dimensions.model';

@Component({
  selector: 'home-hub-weather-forecasts',
  templateUrl: './weather-forecasts.component.html',
  styleUrls: ['./weather-forecasts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherForecastsComponent extends ComponentAbstract implements AfterViewInit {
  public readonly forecastLocations$ = this.store.select(selectForecastLocations);

  public readonly onScroll = new EventEmitter<void>();

  public scrollAreaDimensions?: WeatherForecastScrollAreaDimensions;

  @ViewChild('scrollArea') private readonly scrollArea?: ElementRef;

  constructor(element: ElementRef, private readonly store: Store) {
    super(element);
  }

  public async ngAfterViewInit(): Promise<void> {
    // Prevent ExpressionChangedAfterItHasBeenCheckedError
    await delay();

    if (!this.scrollArea) {
      throw new Error('Scroll area not found');
    }

    const { left, right } = this.scrollArea.nativeElement.getBoundingClientRect();

    this.scrollAreaDimensions = { left, right };
  }
}
