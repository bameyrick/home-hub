import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getStartOfHour, isEqual } from '@qntm-code/utils';
import { CurrentWeather } from '../models';
import { WeatherState, WEATHER_FEATURE_KEY } from './weather.reducer';

const selectWeatherState = createFeatureSelector<WeatherState>(WEATHER_FEATURE_KEY);

export const selectWeatherLocations = createSelector(selectWeatherState, state => state.locations);

export const selectCurrentWeather = (now: Date) =>
  createSelector(selectWeatherLocations, locations => {
    const location = locations?.[0];
    const hour = location?.hourly.find(hour => isEqual(getStartOfHour(hour.time), getStartOfHour(now)));

    const result: CurrentWeather | undefined =
      hour && location
        ? {
            ...hour,
            sunrise: hour.sunrise,
            sunset: hour.sunset,
            noon: hour.noon,
            twilightBegin: hour.twilightBegin,
            twilightEnd: hour.twilightEnd,
            updated: location.modelRunDate,
            name: location.locationName,
          }
        : undefined;

    return result;
  });

export const selectForecastLocations = createSelector(selectWeatherState, state => state.locationForecasts);
