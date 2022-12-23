import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { weatherReducer, WEATHER_FEATURE_KEY } from './store';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [BaseModule, StoreModule.forFeature(WEATHER_FEATURE_KEY, weatherReducer)],
  declarations: [WeatherComponent],
  exports: [WeatherComponent],
})
export class WeatherModule {
  constructor(private readonly weatherService: WeatherService) {
    this.weatherService.setupWebsocket();
  }
}
