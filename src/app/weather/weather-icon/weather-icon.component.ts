import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';
import { AnimatedWeatherIcon, AnimatedWeatherTimes, AnimatedWeatherTypes } from 'animated-weather-icon';
import { combineLatest, distinctUntilChanged, ReplaySubject } from 'rxjs';
import { IsVisbileComponentAbstract } from '../../abstracts';
import { weatherCodeToAnimatedWeatherType } from '../helpers';

@Component({
  selector: 'home-hub-weather-icon',
  template: ``,
  styleUrls: ['./weather-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherIconComponent extends IsVisbileComponentAbstract implements OnInit, OnChanges {
  protected readonly baseClassName = 'WeatherIcon';

  @Input() public weatherCode?: number;

  @Input() public sunrise?: Date;

  @Input() public sunset?: Date;

  @Input() public displayTime?: Date | null;

  public icon?: AnimatedWeatherIcon;

  private readonly iconParams$ = new ReplaySubject<{ type: AnimatedWeatherTypes; time: AnimatedWeatherTimes }>(1);

  public override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      combineLatest([this.iconParams$, this.visible$])
        .pipe(distinctUntilChanged())
        .subscribe(([{ type, time }, visible]) => {
          if (visible) {
            this.icon?.setType(type, time);
          } else {
            this.icon?.unsetIcon(true);
          }
        })
    );
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

    this.iconParams$.next({
      type: weatherCodeToAnimatedWeatherType(this.weatherCode || 0),
      time: this.iconTime,
    });
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
