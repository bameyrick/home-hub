import { HomeData } from '@home-hub/common';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isNullOrUndefined } from '@qntm-code/utils';
import { HOME_DATA_FEATURE_KEY } from './home-data.reducer';

const selectWeatherState = createFeatureSelector<HomeData>(HOME_DATA_FEATURE_KEY);

export const selectHomeData = createSelector(selectWeatherState, state => state);

export const selectMaxIndoorTemperature = createSelector(selectHomeData, state =>
  !isNullOrUndefined(state?.upstairsTemp) && !isNullOrUndefined(state?.downstairsTemp)
    ? Math.max(state.upstairsTemp, state.downstairsTemp)
    : undefined
);
