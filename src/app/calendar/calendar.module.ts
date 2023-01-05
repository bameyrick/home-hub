import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BaseModule } from '../base.module';
import { CalendarService } from './calendar.service';
import { calendarReducer, CALENDAR_FEATURE_KEY } from './store';
import { TodaysEventsComponent } from './todays-events/todays-events.component';

@NgModule({
  imports: [BaseModule, StoreModule.forFeature(CALENDAR_FEATURE_KEY, calendarReducer)],
  declarations: [TodaysEventsComponent],
  exports: [TodaysEventsComponent],
})
export class CalendarModule {
  constructor(private readonly calendarService: CalendarService) {
    this.calendarService.setupWebsocket();
  }
}
