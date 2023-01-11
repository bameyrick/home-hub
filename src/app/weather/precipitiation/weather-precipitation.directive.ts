import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Colour } from '../../enums';

@Directive({
  selector: '[precipitation]',
})
export class WeatherPrecipitationDirective implements OnChanges {
  @Input() public precipitation?: number;

  constructor(private readonly elementRef: ElementRef) {}

  public ngOnChanges(): void {
    if (this.precipitation) {
      let colour = Colour.black;

      if (this.precipitation > 80) {
        colour = Colour.darkBlue;
      } else if (this.precipitation > 50) {
        colour = Colour.blue;
      } else if (this.precipitation > 15) {
        colour = Colour.lightBlue;
      }

      this.elementRef.nativeElement.style.setProperty('color', colour);
    }
  }
}
