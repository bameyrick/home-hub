import { ForecastLocation } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';

const weatherUpdated = createAction('[Weather] Weather Updated', props<{ locations: ForecastLocation[] }>());

export const WeatherActions = {
  weatherUpdated,
};
