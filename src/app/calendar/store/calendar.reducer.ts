import { CalendarEvent } from '@home-hub/common';
import { createReducer, on } from '@ngrx/store';
import { TodayEvent } from '../models';
import { CalendarActions } from './calendar.actions';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface CalendarState {
  events?: CalendarEvent[];
  todaysEvents?: TodayEvent[];
}

export const calendarReducer = createReducer<CalendarState>(
  {},

  on(CalendarActions.calendarUpdated, (state, { events }) => ({ ...state, events })),

  on(CalendarActions.todaysCalendarEventsGenerated, (state, { todaysEvents }) => ({ ...state, todaysEvents }))
);
