import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { HomeDataComponent } from './home-data.component';
import { HomeDataService } from './home-data.service';
import { HOME_DATA_FEATURE_KEY, HomeDataEffects, homeDataReducer } from './store';

@NgModule({
  declarations: [HomeDataComponent],
  imports: [BaseModule, StoreModule.forFeature(HOME_DATA_FEATURE_KEY, homeDataReducer), EffectsModule.forFeature([HomeDataEffects])],
  exports: [HomeDataComponent],
})
export class HomeDataModule {
  constructor(private readonly homeDataService: HomeDataService) {
    this.homeDataService.setupWebsocket();
  }
}
