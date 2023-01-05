import { CalendarEvent } from '@home-hub/common';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getEndOfDay, getStartOfDay } from '@qntm-code/utils';
import { CalendarState, CALENDAR_FEATURE_KEY } from './calendar.reducer';

const selectCalendarState = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);

export const selectCalendarEvents = createSelector(selectCalendarState, state => state.events);

export const selectTodaysEvents = (now: Date) =>
  createSelector(selectCalendarEvents, events =>
    events
      ?.filter(event => getStartOfDay(event.start) <= now && event.end >= now)
      .map(event => {
        const startOfDay = getStartOfDay(now);
        const endOfDay = getEndOfDay(now);
        const allDay = event.start <= startOfDay && event.end >= endOfDay;

        return {
          ...event,
          allDay,
          startTimeFormat: getTimeFormat(allDay, event, event => event.start <= startOfDay),
          endTimeFormat: getTimeFormat(allDay, event, event => event.end >= endOfDay),
        };
      })
  );

function getTimeFormat(allDay: boolean, event: CalendarEvent, comparator: (event: CalendarEvent) => boolean): string {
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
