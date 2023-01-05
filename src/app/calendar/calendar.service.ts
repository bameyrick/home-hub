import { Injectable } from '@angular/core';
import { CalendarEvent } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { CalendarActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly socket: Socket, private readonly store: Store) {}

  public setupWebsocket(): void {
    this.socket
      .fromEvent<CalendarEvent[]>('calendar')
      .pipe(
        map(events =>
          events.map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            created: new Date(event.created),
            updated: new Date(event.updated),
          }))
        )
      )
      .subscribe(events => this.store.dispatch(CalendarActions.calendarUpdated({ events })));
  }
}
