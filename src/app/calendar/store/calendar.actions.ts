import { CalendarEvent } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';
import { TodayEvent } from '../models';

const calendarUpdated = createAction('[Calendar] Calendar Updated', props<{ events: CalendarEvent[] }>());

const generateTodaysCalendarEvents = createAction(`[Calendar] Set Today's Calendar Events`);

const todaysCalendarEventsGenerated = createAction(
  `[Calendar] Today's Calendar Events Generated`,
  props<{ todaysEvents?: TodayEvent[] }>()
);

export const CalendarActions = {
  calendarUpdated,
  generateTodaysCalendarEvents,
  todaysCalendarEventsGenerated,
};
