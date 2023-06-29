import { Injectable } from '@angular/core';
import { HomeData } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { HomeDataActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor(private readonly socket: Socket, private readonly store: Store) {}

  public setupWebsocket(): void {
    this.socket.fromEvent<HomeData>('home-data').subscribe(data => this.store.dispatch(HomeDataActions.homeDataUpdated({ data })));
  }
}
