import { Component, ElementRef } from '@angular/core';
import { ComponentAbstract } from '../abstracts';
import { TimeService } from '../time/time.service';

@Component({
  selector: 'home-hub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ComponentAbstract {
  constructor(elementRef: ElementRef, public readonly timeService: TimeService) {
    super(elementRef);
  }
}
