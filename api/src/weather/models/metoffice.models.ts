export interface MetOfficeResponse {
  features: MetOfficeFeature[];
  type: string;
}

export interface MetOfficeFeature {
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    location: {
      licence: string;
      name: string;
    };
    modelRunDate: string;
    requestPointDistance: number;
    timeSeries: MetOfficeHourlyTimeSeriesItem[];
  };
  type: string;
}

export interface MetOfficeHourlyTimeSeriesItem {
  feelsLikeTemperature?: number;
  feelsLikeTemp?: number;
  max10mWindGust: number;
  maxScreenAirTemp: number;
  minScreenAirTemp: number;
  mslp: number;
  precipitationRate: number;
  probOfPrecipitation: number;
  screenDewPointTemperature: number;
  screenRelativeHumidity: number;
  screenTemperature?: number;
  significantWeatherCode: number;
  time: string;
  totalPrecipAmount: number;
  totalSnowAmount: number;
  uvIndex: number;
  visibility: number;
  windDirectionFrom10m: number;
  windGustSpeed10m: number;
  windSpeed10m: number;
}
