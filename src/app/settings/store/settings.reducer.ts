import { Settings } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';

export const SETTINGS_FEATURE_KEY = `settings`;

export interface SettingsState {
  loading: boolean;
  settings?: Settings;
}

const initialState: SettingsState = {
  loading: false,
};

export const settingsReducer = createReducer<SettingsState>(
  initialState,

  on(SettingsActions.getSettings, SettingsActions.saveSettings, state => ({ ...state, loading: true })),

  on(SettingsActions.getSettingsFailed, SettingsActions.saveSettingsFailed, state => ({ ...state, loading: false })),

  on(SettingsActions.getSettingsSuccess, SettingsActions.saveSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    loading: false,
  }))
);
