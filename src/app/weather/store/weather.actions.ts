import { ForecastLocation } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';
import { WeatherForecastLocation } from '../models';

const weatherUpdated = createAction('[Weather] Weather Updated', props<{ locations: ForecastLocation[] }>());

const generateForecasts = createAction('[Weather] Generate Forecasts');

const forecastsGenerated = createAction('[Weather] Forecast Generated', props<{ locationForecasts: WeatherForecastLocation[] }>());

export const WeatherActions = {
  weatherUpdated,
  generateForecasts,
  forecastsGenerated,
};
