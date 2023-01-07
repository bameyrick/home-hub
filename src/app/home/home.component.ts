import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ComponentAbstract } from '../abstracts';
import { TimeService } from '../time/time.service';

@Component({
  selector: 'home-hub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends ComponentAbstract {
  protected readonly baseClassName = 'Home';

  constructor(elementRef: ElementRef, public readonly timeService: TimeService) {
    super(elementRef);
  }
}
