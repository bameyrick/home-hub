import { Settings } from '@home-hub/common';
import { Body, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DatabasePersistenceService } from '../database/database.service';

@Injectable()
export class SettingsService {
  constructor(private readonly db: DatabasePersistenceService) {}

  public async getSettings(): Promise<Settings> {
    const credentials = await firstValueFrom(this.db.metOfficeCredentials$);
    const caldavCredentials = await firstValueFrom(this.db.caldavCredentials$);

    return {
      weatherLocations: await firstValueFrom(this.db.weatherLocations$),
      clientID: credentials?.clientID ?? '',
      clientSecret: credentials?.clientSecret ?? '',
      caldavEmail: caldavCredentials?.caldavEmail ?? '',
      caldavPassword: caldavCredentials?.caldavPassword ?? '',
    };
  }

  public updateSettings(@Body() settings: Settings): Promise<Settings> {
    this.db.weatherLocations$.next(settings.weatherLocations);

    this.db.metOfficeCredentials$.next({
      clientID: settings.clientID,
      clientSecret: settings.clientSecret,
    });

    this.db.caldavCredentials$.next({
      caldavEmail: settings.caldavEmail,
      caldavPassword: settings.caldavPassword,
    });

    return this.getSettings();
  }
}
