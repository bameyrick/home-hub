import { ForecastLocation } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { CurrentWeather, WeatherForecastLocation } from '../models';
import { WeatherActions } from './weather.actions';

export const WEATHER_FEATURE_KEY = 'weather';

export interface WeatherState {
  locations?: ForecastLocation[];
  locationForecasts?: WeatherForecastLocation[];
  currentWeather?: CurrentWeather;
}

export const weatherReducer = createReducer<WeatherState>(
  {},

  on(WeatherActions.weatherUpdated, (state, { locations }) => ({ ...state, locations })),

  on(WeatherActions.forecastsGenerated, (state, { locationForecasts }) => ({ ...state, locationForecasts })),

  on(WeatherActions.currentWeatherGenerated, (state, { currentWeather }) => ({ ...state, currentWeather }))
);
