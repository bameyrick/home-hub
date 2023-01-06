import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState, WEATHER_FEATURE_KEY } from './weather.reducer';

const selectWeatherState = createFeatureSelector<WeatherState>(WEATHER_FEATURE_KEY);

export const selectWeatherLocations = createSelector(selectWeatherState, state => state.locations);

export const selectFirstWeatherLocation = createSelector(selectWeatherLocations, locations => locations?.[0]);

export const selectCurrentWeather = createSelector(selectWeatherState, state => state.currentWeather);

export const selectForecastLocations = createSelector(selectWeatherState, state => state.locationForecasts);
