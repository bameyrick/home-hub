export interface CalendarEvent {
  id: string;
  start: Date;
  end: Date;
  created: Date;
  updated: Date;
  summary: string;
  location: string;
  travelTime?: number;
  leaveAt?: Date;
  latLon?: [number, number];
}
