import { DialogModule } from '@angular/cdk/dialog';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { BaseModule } from './base.module';

import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ROOT_REDUCERS, RoutingModule } from './routing';

@NgModule({
  declarations: [AppComponent, ErrorDialogComponent],
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
      url: `${location.hostname}:${environment.port}`,
    }),
    DialogModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
