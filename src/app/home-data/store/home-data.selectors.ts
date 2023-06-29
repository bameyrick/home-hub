import { HomeData } from '@home-hub/common';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_DATA_FEATURE_KEY } from './home-data.reducer';

const selectWeatherState = createFeatureSelector<HomeData>(HOME_DATA_FEATURE_KEY);

export const selectHomeData = createSelector(selectWeatherState, state => state);
