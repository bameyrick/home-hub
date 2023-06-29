import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoute } from '../../models';
import { BaseModule } from '../base.module';
import { CalendarModule } from '../calendar/calendar.module';
import { HomeDataModule } from '../home-data/home-data.module';
import { WeatherModule } from '../weather/weather.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BaseModule,
    RouterModule.forChild([{ path: AppRoute.Root, component: HomeComponent }]),
    WeatherModule,
    CalendarModule,
    HomeDataModule,
  ],
})
export class HomeModule {}
