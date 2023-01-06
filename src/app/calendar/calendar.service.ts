import { Injectable } from '@angular/core';
import { CalendarEvent } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { map, skip } from 'rxjs';
import { TimeService } from '../time/time.service';
import { CalendarActions } from './store';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly socket: Socket, private readonly store: Store, private readonly timeSerice: TimeService) {
    this.timeSerice.currentMinute$.pipe(skip(1)).subscribe(() => this.store.dispatch(CalendarActions.generateTodaysCalendarEvents()));
  }

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
