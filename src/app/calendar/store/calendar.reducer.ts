import { CalendarEvent } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { CalendarActions } from './calendar.actions';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface CalendarState {
  events?: CalendarEvent[];
}

export const calendarReducer = createReducer<CalendarState>(
  {},

  on(CalendarActions.calendarUpdated, (state, { events }) => ({ ...state, events }))
);
