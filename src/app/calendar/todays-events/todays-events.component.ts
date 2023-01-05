import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { getEndOfDay, getStartOfDay } from '@qntm-code/utils';
import { map, switchMap } from 'rxjs';
import { ComponentAbstract } from '../../abstracts';
import { TimeService } from '../../time/time.service';
import { selectTodaysEvents } from '../store';

@Component({
  selector: 'home-hub-todays-events',
  templateUrl: './todays-events.component.html',
  styleUrls: ['./todays-events.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodaysEventsComponent extends ComponentAbstract {
  public readonly events$ = this.timeService.now$.pipe(switchMap(now => this.store.select(selectTodaysEvents(now))));

  public readonly startOfDay$ = this.timeService.now$.pipe(map(now => getStartOfDay(now)));

  public readonly endOfDay$ = this.timeService.now$.pipe(map(now => getEndOfDay(now)));

  constructor(elementRef: ElementRef, private readonly store: Store, private readonly timeService: TimeService) {
    super(elementRef);
  }

  public trackBy(_: number, event: CalendarEvent): string {
    return event.id;
  }
}
