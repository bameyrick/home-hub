import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../../models';

const routes: Routes = [
  {
    path: AppRoute.Root,
    children: [
      {
        path: AppRoute.Root,
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: AppRoute.Settings,
        loadChildren: () =>
          import('../settings/settings.module').then((m) => m.SettingsModule),
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
