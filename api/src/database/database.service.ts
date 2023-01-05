import { CalDavCredentials, MetOfficeCredentials, NullableLatLon } from '@home-hub/common';
import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { BehaviorSubject, combineLatest, skip } from 'rxjs';

@Injectable()
export class DatabasePersistenceService {
  private readonly fileName = 'settings.json';

  public readonly metOfficeCredentials$ = new BehaviorSubject<MetOfficeCredentials | null>(null);

  public readonly weatherLocations$ = new BehaviorSubject<Array<NullableLatLon>>([{ latitude: null, longitude: null }]);

  public readonly caldavCredentials$ = new BehaviorSubject<CalDavCredentials | null>(null);

  constructor() {
    if (existsSync(this.fileName)) {
      const settings = JSON.parse(readFileSync(this.fileName, { encoding: 'utf-8' }));

      this.metOfficeCredentials$.next(settings.credentials);
      this.weatherLocations$.next(settings.locations);
      this.caldavCredentials$.next(settings.caldavCredentials);
    }

    combineLatest([this.metOfficeCredentials$, this.weatherLocations$, this.caldavCredentials$])
      .pipe(skip(1))
      .subscribe(([credentials, locations, caldavCredentials]) => {
        writeFileSync(this.fileName, JSON.stringify({ credentials, locations, caldavCredentials }));
      });
  }
}
