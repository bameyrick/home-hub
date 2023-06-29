import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { isNumber } from '@qntm-code/utils';
import { Colour } from '../../enums';
import { mixColours } from '../helpers';

@Directive({
  selector: '[temperature]',
})
export class WeatherTemperatureDirective implements OnChanges {
  @Input() public temperature?: number | null;

  constructor(private readonly elementRef: ElementRef) {}

  public ngOnChanges(): void {
    this.setColours();
  }

  private setColours(): void {
    if (isNumber(this.temperature)) {
      let backgroundColour: string = Colour.darkBlue;
      let textColour: Colour = Colour.black;

      if (this.temperature > 40) {
        backgroundColour = Colour.red;
      } else if (this.temperature > 25) {
        backgroundColour = mixColours(Colour.red, Colour.orange, this.getPercentage(25, 40, this.temperature));
      } else if (this.temperature > 15) {
        backgroundColour = mixColours(Colour.orange, Colour.yellow, this.getPercentage(15, 25, this.temperature));
      } else if (this.temperature > 5) {
        backgroundColour = mixColours(Colour.yellow, Colour.lightBlue, this.getPercentage(5, 15, this.temperature));
      } else if (this.temperature > 0) {
        backgroundColour = mixColours(Colour.lightBlue, Colour.darkBlue, this.getPercentage(0, 5, this.temperature));
      }

      if (this.temperature <= 10) {
        textColour = Colour.white;
      }

      this.elementRef.nativeElement.style.setProperty('background', backgroundColour);
      this.elementRef.nativeElement.style.setProperty('color', textColour);
    }
  }

  private getPercentage(from: number, to: number, value: number): number {
    const difference = Math.abs(from - to);

    return Math.abs((value - from) / difference);
  }
}
