import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { CompassComponent } from './compass/compass.component';
import { WeatherDescriptionPipe } from './pipes/weather-description.pipe';
import { WeatherEffects, weatherReducer, WEATHER_FEATURE_KEY } from './store';
import { WeatherForecastNavigationComponent } from './weather-forecasts/weather-forecast/weather-forecast-navigation/weather-forecast-navigation.component';
import { WeatherForecastComponent } from './weather-forecasts/weather-forecast/weather-forecast.component';
import { WeatherForecastsComponent } from './weather-forecasts/weather-forecasts.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherSkyComponent } from './weather-sky/weather-sky.component';
import { WeatherUVComponent } from './weather-uv/weather-uv.component';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [BaseModule, StoreModule.forFeature(WEATHER_FEATURE_KEY, weatherReducer), EffectsModule.forFeature([WeatherEffects])],
  declarations: [
    WeatherComponent,
    WeatherIconComponent,
    WeatherSkyComponent,
    WeatherDescriptionPipe,
    CompassComponent,
    WeatherNowComponent,
    WeatherForecastsComponent,
    WeatherForecastComponent,
    WeatherUVComponent,
    WeatherForecastNavigationComponent,
  ],
  exports: [WeatherComponent],
})
export class WeatherModule {
  constructor(private readonly weatherService: WeatherService) {
    this.weatherService.setupWebsocket();
  }
}
