import { CalendarEvent } from '@home-hub/common';

export interface TodayEvent extends CalendarEvent {
  allDay: boolean;
  startTimeFormat: string;
  endTimeFormat: string;
}
