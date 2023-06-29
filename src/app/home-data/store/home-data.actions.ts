import { HomeData } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';

const homeDataUpdated = createAction('[Home Data] Home Data Updated', props<{ data: HomeData }>());

export const HomeDataActions = {
  homeDataUpdated,
};
