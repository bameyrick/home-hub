import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getStartOfDay, getStartOfHour, isEqual } from '@qntm-code/utils';
import { WeatherState, WEATHER_FEATURE_KEY } from './weather.reducer';

const selectWeatherState = createFeatureSelector<WeatherState>(WEATHER_FEATURE_KEY);

export const selectWeatherLocations = createSelector(selectWeatherState, state => state.locations);

export const selectCurrentWeather = createSelector(selectWeatherLocations, locations => {
  const location = locations?.[0];
  const hour = location?.hourly.find(hour => isEqual(getStartOfHour(hour.time), getStartOfHour(new Date())));
  const today = location?.daily.find(day => isEqual(getStartOfDay(day.date), getStartOfDay(new Date())));

  return {
    ...hour,
    sunrise: today?.sunrise,
    sunset: today?.sunset,
  };
});
