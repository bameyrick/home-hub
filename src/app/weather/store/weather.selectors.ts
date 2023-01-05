import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getStartOfDay, getStartOfHour, isEqual } from '@qntm-code/utils';
import { CurrentWeather } from '../models';
import { WeatherState, WEATHER_FEATURE_KEY } from './weather.reducer';

const selectWeatherState = createFeatureSelector<WeatherState>(WEATHER_FEATURE_KEY);

export const selectWeatherLocations = createSelector(selectWeatherState, state => state.locations);

export const selectCurrentWeather = (now: Date) =>
  createSelector(selectWeatherLocations, locations => {
    const location = locations?.[0];
    const hour = location?.hourly.find(hour => isEqual(getStartOfHour(hour.time), getStartOfHour(now)));
    const today = location?.daily.find(day => isEqual(getStartOfDay(day.date), getStartOfDay(now)));

    const result: CurrentWeather | undefined =
      today && hour && location
        ? {
            ...hour,
            sunrise: today.sunrise,
            sunset: today.sunset,
            noon: today.noon,
            twilightBegin: today.twilightBegin,
            twilightEnd: today.twilightEnd,
            updated: location.modelRunDate,
            name: location.locationName,
          }
        : undefined;

    return result;
  });
