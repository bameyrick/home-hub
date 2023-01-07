import { Component, ViewEncapsulation } from '@angular/core';
import { ComponentAbstract } from './abstracts';

@Component({
  selector: 'home-hub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends ComponentAbstract {
  protected readonly baseClassName = 'App';
}
