import { Settings } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';

const getSettings = createAction('[Settings] Get Settings');

const getSettingsSuccess = createAction('[Settings] Get Settings Success', props<{ settings: Settings }>());

const getSettingsFailed = createAction('[Settings] Get Settings Failed');

const saveSettings = createAction('[Settings] Save Settings', props<{ settings: Settings }>());

const saveSettingsSuccess = createAction('[Settings] Save Settings Success', props<{ settings: Settings }>());

const saveSettingsFailed = createAction('[Settings] Save Settings Failed');

export const SettingsActions = {
  getSettings,
  getSettingsSuccess,
  getSettingsFailed,
  saveSettings,
  saveSettingsSuccess,
  saveSettingsFailed,
};
