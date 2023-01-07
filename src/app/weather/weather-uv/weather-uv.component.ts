import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';
import { ComponentAbstract } from '../../abstracts';

@Component({
  selector: 'home-hub-weather-uv',
  templateUrl: './weather-uv.component.html',
  styleUrls: ['./weather-uv.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherUVComponent extends ComponentAbstract implements OnChanges {
  protected readonly baseClassName = 'WeatherUV';

  @Input() public uvIndex?: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['uvIndex']) {
      [0, 1, 2, 3, 4, 5].forEach(index => this.elementRef.nativeElement.classList.remove(this.getClassName(index)));

      if (!isNullOrUndefined(this.uvIndex)) {
        this.elementRef.nativeElement.classList.add(this.getClassName(this.uvIndex));
      }
    }
  }

  private getClassName(uvIndex: number): string {
    return `${this.baseClassName}--${uvIndex}`;
  }
}
