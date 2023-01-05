import { CalendarEvent } from '@home-hub/common';
import { Injectable, Logger } from '@nestjs/common';
import { convertTimeUnit, getEndOfYear, getStartOfDay, isEmpty, isNullOrUndefined, TimeUnit, unitToMS } from '@qntm-code/utils';
import * as ical from 'ical';
import { CalendarComponent } from 'ical';
import { combineLatest, filter, forkJoin, map, mergeMap, of, shareReplay, switchMap, tap, timer } from 'rxjs';
import { sortBy } from 'sort-by-typescript';
import { createDAVClient, DAVObject } from 'tsdav';
import { DatabasePersistenceService } from '../database/database.service';

@Injectable()
export class CalDavService {
  private readonly updateInterval = 1;
  private email?: string;

  private readonly client$ = this.db.caldavCredentials$.pipe(
    filter(credentials => !isNullOrUndefined(credentials) && !isEmpty(credentials.caldavEmail) && !isEmpty(credentials.caldavPassword)),
    tap(credentials => (this.email = credentials?.caldavEmail)),
    switchMap(credentials =>
      createDAVClient({
        serverUrl: 'https://caldav.icloud.com',
        credentials: {
          username: credentials?.caldavEmail,
          password: credentials?.caldavPassword,
        },
        authMethod: 'Basic',
        defaultAccountType: 'caldav',
      })
    ),
    shareReplay(1)
  );

  public readonly events$ = combineLatest([
    timer(0, convertTimeUnit(this.updateInterval, TimeUnit.Minutes, TimeUnit.Milliseconds)),
    this.client$,
  ]).pipe(
    tap(() => Logger.log(`FETCHING CALENDAR EVENTS`)),
    mergeMap(([_, client]) => combineLatest([of(client), client.fetchCalendars()])),
    map(([client, calendars]) => ({
      client,
      calendars: calendars.filter(calendar => calendar.components?.includes('VEVENT') && !calendar.resourcetype.includes('shared')),
    })),
    mergeMap(({ client, calendars }) =>
      forkJoin(
        calendars.map(calendar =>
          client.fetchCalendarObjects({
            calendar,
            expand: true,
            timeRange: { start: getStartOfDay().toISOString(), end: getEndOfYear().toISOString() },
          })
        )
      ).pipe(map(calendars => this.parseEvents(calendars)))
    ),
    shareReplay(1)
  );

  constructor(private readonly db: DatabasePersistenceService) {}

  private parseEvents(calendars: DAVObject[][]): CalendarEvent[] {
    return calendars
      .map(events =>
        events
          .map(({ data }) => Object.values(ical.parseICS(data))[0])
          .filter(
            event =>
              !(
                event['attendee'] as unknown as Array<{
                  params: {
                    EMAIL: string;
                    PARTSTAT: string;
                  };
                }>
              )?.some(({ params }) => params.EMAIL === this.email && params.PARTSTAT === 'DECLINED')
          )
          .map(event => this.parseEvent(event))
      )
      .flat()
      .sort(sortBy('start'));
  }

  private parseEvent(component: CalendarComponent): CalendarEvent {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const travelTime = this.durationToMilliseconds((component['APPLE-TRAVEL-DURATION'] as unknown as Record<string, string>)?.['val']);
    const leaveAt = travelTime ? new Date(component.start!.getTime() - travelTime) : undefined;

    return {
      id: component.uid!,
      start: new Date(component.start!),
      end: new Date(component.end!),
      created: new Date(component.created!),
      updated: new Date(component.lastmodified!),
      summary: component.summary!,
      location: component.location!,
      latLon: (component['APPLE-STRUCTURED-LOCATION'] as unknown as Record<string, string>)?.['val']
        .split('geo:')[1]
        .split(',')
        .map(coordinate => parseFloat(coordinate)) as [number, number],
      travelTime,
      leaveAt,
    };
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  private durationToMilliseconds(duration?: string): number | undefined {
    if (duration) {
      duration = duration.replace('PT', 'PT');

      const hours = parseInt(duration.match(/(\d+)H/)?.[1] || '0');
      const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || '0');

      return unitToMS(hours, TimeUnit.Hours) + unitToMS(minutes, TimeUnit.Minutes);
    }

    return;
  }
}
