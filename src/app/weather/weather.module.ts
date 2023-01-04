import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { CompassComponent } from './compass/compass.component';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { weatherReducer, WEATHER_FEATURE_KEY } from './store';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherSkyComponent } from './weather-sky/weather-sky.component';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [BaseModule, StoreModule.forFeature(WEATHER_FEATURE_KEY, weatherReducer)],
  declarations: [
    WeatherComponent,
    WeatherIconComponent,
    WeatherSkyComponent,
    WeatherDescriptionPipe,
    CompassComponent,
    WeatherNowComponent,
  ],
  exports: [WeatherComponent],
})
export class WeatherModule {
  constructor(private readonly weatherService: WeatherService) {
    this.weatherService.setupWebsocket();
  }
}
