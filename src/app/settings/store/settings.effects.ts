import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SettingsService } from '../settings.service';
import { SettingsActions } from './settings.actions';

@Injectable()
export class SettingsEffects {
  constructor(private readonly actions$: Actions, private readonly settingsService: SettingsService) {}

  public readonly getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.getSettings),
      switchMap(() =>
        this.settingsService.getSettings().pipe(
          map(settings => SettingsActions.getSettingsSuccess({ settings })),
          catchError(() => of(SettingsActions.getSettingsFailed()))
        )
      )
    )
  );

  public readonly saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveSettings),
      switchMap(({ settings }) =>
        this.settingsService.saveSettings(settings).pipe(
          map(settings => SettingsActions.saveSettingsSuccess({ settings })),
          catchError(() => of(SettingsActions.saveSettingsFailed()))
        )
      )
    )
  );
}
