import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoute } from '../../models';
import { BaseModule } from '../base.module';
import { WeatherModule } from '../weather/weather.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [BaseModule, RouterModule.forChild([{ path: AppRoute.Root, component: HomeComponent }]), WeatherModule],
})
export class HomeModule {}
