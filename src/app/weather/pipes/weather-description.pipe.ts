import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';

@Pipe({
  name: 'weatherDescription',
})
export class WeatherDescriptionPipe implements PipeTransform {
  public transform(code?: number, sunrise?: Date, sunset?: Date, time?: Date | null): string {
    if (isNullOrUndefined(code) || !sunrise || !sunset || !time) {
      return '';
    }

    console.log(code);

    const isDay = time > sunrise && time < sunset;

    switch (code) {
      case 2:
      case 3: {
        return 'Partly cloudy';
      }
      case 5: {
        return 'Misty';
      }
      case 6: {
        return 'Foggy';
      }
      case 7: {
        return 'Cloudy';
      }
      case 8: {
        return 'Overcast';
      }
      case 9:
      case 10: {
        return 'Light rain showers';
      }
      case 11: {
        return 'Drizzly';
      }
      case 12: {
        return 'Light rain';
      }
      case 13:
      case 14: {
        return 'Heavy rain showers';
      }
      case 15: {
        return 'Heavy rain';
      }
      case 16:
      case 17: {
        return 'Sleet showers';
      }
      case 18: {
        return 'Sleet';
      }
      case 19:
      case 20: {
        return 'Hail showers';
      }
      case 21: {
        return 'Hail';
      }
      case 22:
      case 23: {
        return 'Light snow showers';
      }
      case 24: {
        return 'Snowy';
      }
      case 25:
      case 26: {
        return 'Heavy snow showers';
      }
      case 27: {
        return 'Heavy snow';
      }
      case 28:
      case 29: {
        return 'Thunder showers';
      }
      case 30: {
        return 'Thunder';
      }
      default: {
        return isDay ? 'Sunny' : 'Clear';
      }
    }
  }
}
