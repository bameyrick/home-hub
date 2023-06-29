import { HomeData } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { HomeDataActions } from './home-data.actions';

export const HOME_DATA_FEATURE_KEY = 'homeData';

export const homeDataReducer = createReducer<HomeData>(
  {},

  on(HomeDataActions.homeDataUpdated, (_state, { data }) => data)
);
