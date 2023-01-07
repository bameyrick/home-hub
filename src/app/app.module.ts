import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { BaseModule } from './base.module';

import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { ROOT_REDUCERS, RoutingModule } from './routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BaseModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Home Hub App',
        })
      : [],
    EffectsModule.forRoot([]),
    RoutingModule,
    SocketIoModule.forRoot({
      url: `http://localhost:${environment.port}`,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
