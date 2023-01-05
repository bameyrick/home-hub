import { ForecastedHour, SunriseSunset } from '@home-hub/common';

export interface CurrentWeather extends ForecastedHour, SunriseSunset {
  updated: Date;
  name: string;
}
