import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { weatherReducer, WEATHER_FEATURE_KEY } from './store';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherSkyComponent } from './weather-sky/weather-sky.component';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  // TODO: Remove forms module
  imports: [BaseModule, StoreModule.forFeature(WEATHER_FEATURE_KEY, weatherReducer), FormsModule],
  declarations: [WeatherComponent, WeatherIconComponent, WeatherSkyComponent],
  exports: [WeatherComponent],
})
export class WeatherModule {
  constructor(private readonly weatherService: WeatherService) {
    this.weatherService.setupWebsocket();
  }
}
