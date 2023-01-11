import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { TimeUnit, unitToMS } from '@qntm-code/utils';
import { ComponentAbstract } from '../../abstracts';

@Component({
  selector: 'home-hub-weather-sky',
  templateUrl: './weather-sky.component.html',
  styleUrls: ['./weather-sky.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherSkyComponent extends ComponentAbstract implements OnChanges {
  protected readonly baseClassName = 'WeatherSky';

  @Input() public time?: Date | null;

  @Input() public twilightBegin?: Date;

  @Input() public sunrise?: Date;

  @Input() public noon?: Date;

  @Input() public sunset?: Date;

  @Input() public twilightEnd?: Date;

  public nightSkyOpacity = 1;

  public sunriseSkyOpacity = 0;

  public daySkyOpacity = 0;

  public ngOnChanges(): void {
    this.setSky();
  }

  private setSky(): void {
    if (!this.twilightBegin || !this.sunrise || !this.noon || !this.sunset || !this.twilightEnd || !this.time) {
      return;
    }

    const time = this.time.getTime();
    const twilightBegin = this.twilightBegin.getTime();
    const sunrise = this.sunrise.getTime();
    const noon = this.noon.getTime();
    const sunset = this.sunset.getTime();
    const twilightEnd = this.twilightEnd.getTime();

    this.setNightSkyOpacity(time, twilightBegin, sunrise, sunset, twilightEnd);
    this.setSunriseSkyOpacity(time, twilightBegin, sunrise, noon, sunset, twilightEnd);
    this.setDaySkyOpacity(time, twilightBegin, noon, twilightEnd);
  }

  private setNightSkyOpacity(time: number, twilightBegin: number, sunrise: number, sunset: number, twilightEnd: number): void {
    if (time <= twilightBegin || time >= twilightEnd) {
      this.nightSkyOpacity = 1;
    } else if (time >= twilightBegin && time < sunrise) {
      const twilightDiff = sunrise - twilightBegin;
      const timeDiff = sunrise - time;

      this.nightSkyOpacity = timeDiff / twilightDiff;
    } else if (time <= twilightEnd && time > sunset) {
      const twilightDiff = twilightEnd - sunset;
      const timeDiff = time - sunset;

      this.nightSkyOpacity = timeDiff / twilightDiff;
    } else {
      this.nightSkyOpacity = 0;
    }
  }

  private setSunriseSkyOpacity(
    time: number,
    twilightBegin: number,
    sunrise: number,
    noon: number,
    sunset: number,
    twilightEnd: number
  ): void {
    const sunriseEnd = sunrise + unitToMS(1, TimeUnit.Hours);
    const sunsetStart = sunset - unitToMS(1, TimeUnit.Hours);

    if (time < twilightBegin || time > twilightEnd || (time > sunriseEnd && time < sunsetStart)) {
      this.sunriseSkyOpacity = 0;
    } else if (time < sunrise) {
      const twilightDiff = sunrise - twilightBegin;
      const timeDiff = time - twilightBegin;

      this.sunriseSkyOpacity = timeDiff / twilightDiff;
    } else if (time < sunriseEnd) {
      const sunriseDiff = sunriseEnd - sunrise;
      const timeDiff = time - sunrise;

      this.sunriseSkyOpacity = 1 - timeDiff / sunriseDiff;
    } else if (time < sunset) {
      const noonDiff = sunset - sunsetStart;
      const timeDiff = time - sunsetStart;

      this.sunriseSkyOpacity = timeDiff / noonDiff;
    } else {
      const sunsetDiff = twilightEnd - sunset;
      const timeDiff = time - sunset;

      this.sunriseSkyOpacity = 1 - timeDiff / sunsetDiff;
    }
  }

  private setDaySkyOpacity(time: number, twilightBegin: number, noon: number, twilightEnd: number): void {
    if (time < twilightBegin || time > twilightEnd) {
      this.daySkyOpacity = 0;
    } else if (time < noon) {
      const twilightDiff = noon - twilightBegin;
      const timeDiff = time - twilightBegin;

      this.daySkyOpacity = timeDiff / twilightDiff;
    } else {
      const noonDiff = twilightEnd - noon;
      const timeDiff = time - noon;

      this.daySkyOpacity = 1 - timeDiff / noonDiff;
    }
  }
}
