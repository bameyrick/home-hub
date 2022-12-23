import { ForecastLocation } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { WeatherActions } from './weather.actions';

export const WEATHER_FEATURE_KEY = 'weather';

export interface WeatherState {
  locations?: ForecastLocation[];
}

export const weatherReducer = createReducer<WeatherState>(
  {},

  on(WeatherActions.weatherUpdated, (state, { locations }) => ({ ...state, locations }))
);
