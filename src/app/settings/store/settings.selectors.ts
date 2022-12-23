import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isNullOrUndefined } from '@qntm-code/utils';
import { SettingsState, SETTINGS_FEATURE_KEY } from './settings.reducer';

const selectSettingsState = createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

export const selectSettingsLoading = createSelector(selectSettingsState, state => state.loading || isNullOrUndefined(state.settings));

export const selectSettings = createSelector(selectSettingsState, state => state.settings);
