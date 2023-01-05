import { CalendarEvent } from '@home-hub/common';
import { createAction, props } from '@ngrx/store';

const calendarUpdated = createAction('[Calendar] Calendar Updated', props<{ events: CalendarEvent[] }>());

export const CalendarActions = {
  calendarUpdated,
};
