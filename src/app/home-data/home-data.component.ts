import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentAbstract } from '../abstracts';
import { Colour } from '../enums';
import { selectHomeData } from './store/home-data.selectors';

@Component({
  selector: 'home-hub-home-data',
  templateUrl: './home-data.component.html',
  styleUrls: ['./home-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeDataComponent extends ComponentAbstract {
  protected readonly baseClassName = 'HomeData';

  public readonly data$ = this.store.select(selectHomeData);

  public readonly Colour = Colour;

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }
}
