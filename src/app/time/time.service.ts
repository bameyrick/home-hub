import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, shareReplay, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  public readonly now$ = timer(0, 1000).pipe(
    map(() => new Date()),
    shareReplay(1)
  );

  public readonly currentHour$ = this.now$.pipe(
    map(now => now.getHours()),
    distinctUntilChanged(),
    shareReplay(1)
  );
}
