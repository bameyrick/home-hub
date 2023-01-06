import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState, CALENDAR_FEATURE_KEY } from './calendar.reducer';

const selectCalendarState = createFeatureSelector<CalendarState>(CALENDAR_FEATURE_KEY);

export const selectCalendarEvents = createSelector(selectCalendarState, state => state.events);

export const selectTodaysEvents = createSelector(selectCalendarState, state => state.todaysEvents);

export const selectEventById = (id: string) => createSelector(selectCalendarEvents, events => events?.find(event => event.id === id));
