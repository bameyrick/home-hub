import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { isEqual, isNullOrUndefined } from '@qntm-code/utils';
import { AnimatedWeatherIcon, AnimatedWeatherTimes, AnimatedWeatherTypes } from 'animated-weather-icon';
import { combineLatest, distinctUntilChanged, ReplaySubject } from 'rxjs';
import { IsVisbileComponentAbstract } from '../../abstracts';

@Component({
  selector: 'home-hub-weather-icon',
  template: ``,
  styleUrls: ['./weather-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherIconComponent extends IsVisbileComponentAbstract implements OnInit, OnChanges {
  @Input() public weatherCode?: number;

  @Input() public sunrise?: Date;

  @Input() public sunset?: Date;

  @Input() public displayTime?: Date | null;

  public icon?: AnimatedWeatherIcon;

  private readonly iconParams$ = new ReplaySubject<{ type: AnimatedWeatherTypes; time: AnimatedWeatherTimes }>(1);

  public override ngOnInit(): void {
    super.ngOnInit();

    combineLatest([this.iconParams$, this.visible$])
      .pipe(distinctUntilChanged((a, b) => isEqual(a, b)))
      .subscribe(([{ type, time }, visible]) => {
        if (visible) {
          this.icon?.setType(type, time);
        } else {
          this.icon?.unsetIcon();
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['weatherCode'] || changes['displayTime'] || changes['sunrise'] || changes['sunset']) &&
      !isNullOrUndefined(this.weatherCode) &&
      !isNullOrUndefined(this.sunrise) &&
      !isNullOrUndefined(this.sunset)
    ) {
      this.updateIcon();
    }
  }

  private updateIcon(): void {
    if (!this.icon) {
      this.icon = new AnimatedWeatherIcon(this.elementRef.nativeElement);
    }

    this.iconParams$.next({ type: this.iconType, time: this.iconTime });
  }

  private get iconType(): AnimatedWeatherTypes {
    switch (this.weatherCode) {
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

  private get iconTime(): AnimatedWeatherTimes {
    if (!this.sunrise) {
      throw new Error('Sunrise is not defined');
    }

    if (!this.sunset) {
      throw new Error('Sunset is not defined');
    }

    const time = this.displayTime || new Date();

    if (time < this.sunrise || time > this.sunset) {
      return AnimatedWeatherTimes.Night;
    } else {
      return AnimatedWeatherTimes.Day;
    }
  }
}
