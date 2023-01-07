import { ForecastedHour } from '@home-hub/common';

export interface WeatherForecastDay {
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  sunrise: Date;
  sunset: Date;
  noon: Date;
  hours: ForecastedHour[];
}

export type WeatherForecastDays = Record<string, WeatherForecastDay>;

export interface WeatherForecastLocation {
  name: string;
  days: WeatherForecastDays;
  totalHours: number;
  updated: Date;
  flexBasis: string;
  flexBasisCurrent: string;
}
