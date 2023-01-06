import { AnimatedWeatherTypes } from 'animated-weather-icon';

export function weatherCodeToAnimatedWeatherType(code: number): AnimatedWeatherTypes {
  switch (code) {
    case 2:
    case 3: {
      return AnimatedWeatherTypes.BrokenClouds;
    }
    case 5:
    case 6: {
      return AnimatedWeatherTypes.Fog;
    }
    case 7: {
      return AnimatedWeatherTypes.Cloudy;
    }
    case 8: {
      return AnimatedWeatherTypes.Overcast;
    }
    case 9:
    case 10: {
      return AnimatedWeatherTypes.RainShowers;
    }
    case 11: {
      return AnimatedWeatherTypes.Drizzle;
    }
    case 12: {
      return AnimatedWeatherTypes.Rain;
    }
    case 13:
    case 14: {
      return AnimatedWeatherTypes.HeavyRainShowers;
    }
    case 15: {
      return AnimatedWeatherTypes.HeavyRain;
    }
    case 16:
    case 17: {
      return AnimatedWeatherTypes.SleetShowers;
    }
    case 18: {
      return AnimatedWeatherTypes.Sleet;
    }
    case 19:
    case 20:
    case 21: {
      return AnimatedWeatherTypes.Hail;
    }
    case 22:
    case 23: {
      return AnimatedWeatherTypes.SnowShowers;
    }
    case 24: {
      return AnimatedWeatherTypes.Snow;
    }
    case 25:
    case 26: {
      return AnimatedWeatherTypes.HeavySnowShowers;
    }
    case 27: {
      return AnimatedWeatherTypes.HeavySnow;
    }
    case 28:
    case 29: {
      return AnimatedWeatherTypes.ThunderStormRain;
    }
    case 30: {
      return AnimatedWeatherTypes.ThunderStormHeavyRain;
    }
    default: {
      return AnimatedWeatherTypes.Clear;
    }
  }
}
