import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoute } from '../../models';
import { BaseModule } from '../base.module';
import { LocationComponent } from './location/location.component';
import { SettingsComponent } from './settings.component';
import { SettingsEffects, settingsReducer, SETTINGS_FEATURE_KEY } from './store';

@NgModule({
  declarations: [SettingsComponent, LocationComponent],
  imports: [
    BaseModule,
    RouterModule.forChild([{ path: AppRoute.Root, component: SettingsComponent }]),
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class SettingsModule {}
