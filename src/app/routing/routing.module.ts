import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../../models';
import { CalendarEventComponent } from '../calendar/calendar-event/calendar-event.component';
import { WeatherForecastsComponent } from '../weather/weather-forecasts/weather-forecasts.component';

const routes: Routes = [
  {
    path: AppRoute.Root,
    children: [
      {
        path: AppRoute.Root,
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: AppRoute.Settings,
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: AppRoute.Forecasts,
        component: WeatherForecastsComponent,
      },
      {
        path: AppRoute.Event,
        component: CalendarEventComponent,
      },
      {
        path: '**',
        redirectTo: AppRoute.Root,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule {}
