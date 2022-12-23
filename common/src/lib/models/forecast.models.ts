import { LatLon } from './lat-lon';
import { SunriseSunset } from './sunrise-sunset.model';

export interface ForecastLocation {
  location: LatLon;
  actualLocation: LatLon;
  locationName: string;
  requestedPointDistance: number;
  modelRunDate: Date;
  hourly: ForecastedHour[];
  daily: ForecastedDay[];
}

export interface ForecastedHour {
  time: Date;
  temperature: number;
  feelsLikeTemperature: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  uvIndex: number;
  weatherCode: number;
  precipitationProbability: number;
  humidity: number;
}

export interface ForecastedDay extends SunriseSunset {
  date: Date;
  dayMaximumTemperature: number;
  nightMinimumTemperature: number;
  uvIndex: number;
  weatherCode: number;
}
