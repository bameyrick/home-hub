import { Component, Input } from '@angular/core';
import { ComponentAbstract } from '../../abstracts/component.abstract';

@Component({
  selector: 'home-hub-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
})
export class CompassComponent extends ComponentAbstract {
  @Input() public direction?: number = 0;

  public get transform(): string {
    return `rotate(${this.direction}deg)`;
  }
}
