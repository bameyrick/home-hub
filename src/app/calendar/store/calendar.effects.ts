import { Injectable } from '@angular/core';
import { CalendarEvent } from '@home-hub/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getEndOfDay, getStartOfDay, getStartOfMinute, isEqual } from '@qntm-code/utils';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { TodayEvent } from '../models';
import { CalendarActions } from './calendar.actions';
import { selectCalendarEvents, selectTodaysEvents } from './calendar.selectors';

@Injectable()
export class CalendarEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  public readonly generateTodaysCalendarEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.calendarUpdated, CalendarActions.generateTodaysCalendarEvents),
      switchMap(() =>
        this.store.select(selectCalendarEvents).pipe(
          map(events => this.filterEventsForToday(events)),
          withLatestFrom(this.store.select(selectTodaysEvents)),
          filter(([a, b]) => !isEqual(a, b)),
          map(([todaysEvents]) => CalendarActions.todaysCalendarEventsGenerated({ todaysEvents }))
        )
      )
    )
  );

  private filterEventsForToday(events?: CalendarEvent[]): TodayEvent[] | undefined {
    const now = getStartOfMinute();

    return events
      ?.filter(event => getStartOfDay(event.start) <= now && event.end >= now)
      .map(event => {
        const startOfDay = getStartOfDay(now);
        const endOfDay = getEndOfDay(now);
        const allDay = event.start <= startOfDay && event.end >= endOfDay;

        return {
          ...event,
          allDay,
          startTimeFormat: this.getTimeFormatForEvent(allDay, event, event => event.start <= startOfDay),
          endTimeFormat: this.getTimeFormatForEvent(allDay, event, event => event.end >= endOfDay),
        };
      });
  }

  private getTimeFormatForEvent(allDay: boolean, event: CalendarEvent, comparator: (event: CalendarEvent) => boolean): string {
    let timeFormat = 'HH:mm';

    if (!allDay && comparator(event)) {
      timeFormat = 'EEE d';

      const yearMismatch = event.start.getFullYear() !== event.end.getFullYear();

      if (yearMismatch || event.start.getMonth() !== event.end.getMonth()) {
        timeFormat += ' LLL';
      }

      if (yearMismatch) {
        timeFormat += ' yyyy';
      }

      timeFormat += ' - HH:mm';
    }

    return timeFormat;
  }
}
