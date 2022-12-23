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
    timeSeries: MetOfficeHourlyTimeSeriesItem[] | MetOfficeDailyTimeSeriesItem[];
  };
  type: string;
}

export interface MetOfficeHourlyTimeSeriesItem {
  feelsLikeTemperature: number;
  max10mWindGust: number;
  maxScreenAirTemp: number;
  minScreenAirTemp: number;
  mslp: number;
  precipitationRate: number;
  probOfPrecipitation: number;
  screenDewPointTemperature: number;
  screenRelativeHumidity: number;
  screenTemperature: number;
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

export interface MetOfficeDailyTimeSeriesItem {
  dayLowerBoundMaxFeelsLikeTemp: number;
  dayLowerBoundMaxTemp: number;
  dayMaxFeelsLikeTemp: number;
  dayMaxScreenTemperature: number;
  dayProbabilityOfHail: number;
  dayProbabilityOfHeavyRain: number;
  dayProbabilityOfHeavySnow: number;
  dayProbabilityOfPrecipitation: number;
  dayProbabilityOfRain: number;
  dayProbabilityOfSferics: number;
  dayProbabilityOfSnow: number;
  daySignificantWeatherCode: number;
  dayUpperBoundMaxFeelsLikeTemp: number;
  dayUpperBoundMaxTemp: number;
  maxUvIndex: number;
  midday10MWindDirection: number;
  midday10MWindGust: number;
  midday10MWindSpeed: number;
  middayMslp: number;
  middayRelativeHumidity: number;
  middayVisibility: number;
  midnight10MWindDirection: number;
  midnight10MWindGust: number;
  midnight10MWindSpeed: number;
  midnightMslp: number;
  midnightRelativeHumidity: number;
  midnightVisibility: number;
  nightLowerBoundMinFeelsLikeTemp: number;
  nightLowerBoundMinTemp: number;
  nightMinFeelsLikeTemp: number;
  nightMinScreenTemperature: number;
  nightProbabilityOfHail: number;
  nightProbabilityOfHeavyRain: number;
  nightProbabilityOfHeavySnow: number;
  nightProbabilityOfPrecipitation: number;
  nightProbabilityOfRain: number;
  nightProbabilityOfSferics: number;
  nightProbabilityOfSnow: number;
  nightSignificantWeatherCode: number;
  nightUpperBoundMinFeelsLikeTemp: number;
  nightUpperBoundMinTemp: number;
  time: string;
}
