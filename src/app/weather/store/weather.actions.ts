import { ForecastLocation } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';
import { CurrentWeather, WeatherForecastLocation } from '../models';

const weatherUpdated = createAction('[Weather] Weather Updated', props<{ locations: ForecastLocation[] }>());

const generateForecasts = createAction('[Weather] Generate Forecasts');

const forecastsGenerated = createAction('[Weather] Forecast Generated', props<{ locationForecasts: WeatherForecastLocation[] }>());

const generateCurrentWeather = createAction('[Weather] Generate Current Weather');

const currentWeatherGenerated = createAction('[Weather] Current Weather Generated', props<{ currentWeather?: CurrentWeather }>());

export const WeatherActions = {
  weatherUpdated,
  generateForecasts,
  forecastsGenerated,
  generateCurrentWeather,
  currentWeatherGenerated,
};
