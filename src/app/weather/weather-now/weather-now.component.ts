import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentAbstract } from '../../abstracts';
import { CurrentWeather } from '../models';

@Component({
  selector: 'home-hub-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherNowComponent extends ComponentAbstract {
  @Input() public currentWeather$?: Observable<CurrentWeather | undefined>;
}
