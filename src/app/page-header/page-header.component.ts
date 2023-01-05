import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ComponentAbstract } from '../abstracts';

@Component({
  selector: 'header[home-hub-page-header]',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent extends ComponentAbstract {
  @Input() public title?: string;
}
