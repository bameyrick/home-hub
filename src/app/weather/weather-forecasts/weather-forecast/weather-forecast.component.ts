import { Component, ElementRef, Input } from '@angular/core';
import { getStartOfDay } from '@qntm-code/utils';
import { map } from 'rxjs';
import { ComponentAbstract } from '../../../abstracts';
import { TimeService } from '../../../time/time.service';
import { WeatherForecastLocation } from '../../models';

@Component({
  selector: 'home-hub-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent extends ComponentAbstract {
  @Input() public location?: WeatherForecastLocation;

  public readonly today$ = this.timeService.now$.pipe(map(now => getStartOfDay(now).getTime().toString()));

  constructor(elementRef: ElementRef, private readonly timeService: TimeService) {
    super(elementRef);
  }
}
