import { LatLon } from './lat-lon';
import { SunriseSunset } from './sunrise-sunset.model';

export interface ForecastLocation {
  location: LatLon;
  actualLocation: LatLon;
  locationName: string;
  requestedPointDistance: number;
  modelRunDate: Date;
  hourly: ForecastedHour[];
  threeHourly: ForecastedHour[];
}

export interface ForecastedHour extends SunriseSunset {
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
