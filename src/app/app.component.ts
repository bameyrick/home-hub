import { Component } from '@angular/core';
import { ComponentAbstract } from './abstracts';

@Component({
  selector: 'home-hub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentAbstract {
  title = 'home-hub';
}
