import { ForecastedHour } from '@home-hub/common';

export type WeatherForecastDays = Record<number, ForecastedHour[]>;

export interface WeatherForecastLocation {
  name: string;
  days: WeatherForecastDays;
  totalHours: number;
}
