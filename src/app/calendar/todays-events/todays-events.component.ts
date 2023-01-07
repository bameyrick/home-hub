import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { ComponentAbstract } from '../../abstracts';
import { selectTodaysEvents } from '../store';

@Component({
  selector: 'home-hub-todays-events',
  templateUrl: './todays-events.component.html',
  styleUrls: ['./todays-events.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodaysEventsComponent extends ComponentAbstract {
  protected readonly baseClassName = 'TodaysEvents';

  public readonly events$ = this.store.select(selectTodaysEvents);

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public trackBy(_: number, event: CalendarEvent): string {
    return event.id;
  }
}
