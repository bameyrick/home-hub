import { Component } from '@angular/core';
import { TimeService } from '../time/time.service';

@Component({
  selector: 'home-hub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public readonly timeService: TimeService) {}
}
