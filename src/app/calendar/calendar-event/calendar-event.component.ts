import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ComponentAbstract } from '../../abstracts';
import { selectEventById } from '../store';

@Component({
  selector: 'home-hub-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarEventComponent extends ComponentAbstract {
  protected readonly baseClassName = 'CalendarEvent';

  public readonly event$ = this.activatedRoute.params.pipe(
    map(params => params['id']),
    switchMap(id => this.store.select(selectEventById(id)))
  );

  constructor(elementRef: ElementRef, private readonly activatedRoute: ActivatedRoute, private readonly store: Store) {
    super(elementRef);
  }
}
