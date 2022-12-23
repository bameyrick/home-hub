import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIUrl, Settings } from '@home-hub/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private readonly http: HttpClient) {}

  public getSettings(): Observable<Settings> {
    return this.http.get<Settings>(APIUrl.Settings);
  }

  public saveSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(APIUrl.Settings, settings);
  }
}
