import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NullableLatLon, Settings } from '@home-hub/common';
import { Store } from '@ngrx/store';
import { isNullOrUndefined } from '@qntm-code/utils';
import { skipWhile } from 'rxjs';
import { selectSettings, selectSettingsLoading, SettingsActions } from './store';
import { uniqueValidator } from './validators';

interface SettingsForm {
  weatherLocations: FormArray<FormControl<NullableLatLon | null>>;
  clientID: FormControl<string | null>;
  clientSecret: FormControl<string | null>;
}

@Component({
  selector: 'home-hub-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public readonly loading$ = this.store.select(selectSettingsLoading);

  public form?: FormGroup<SettingsForm>;

  constructor(private readonly store: Store, private readonly formBuilder: FormBuilder) {
    this.store.dispatch(SettingsActions.getSettings());

    this.store
      .select(selectSettings)
      .pipe(skipWhile(settings => isNullOrUndefined(settings)))
      .subscribe(settings => {
        if (settings) {
          this.form = this.formBuilder.group({
            clientID: new FormControl<string | null>(settings.clientID),
            clientSecret: new FormControl<string | null>(settings.clientSecret),
            weatherLocations: this.formBuilder.array(settings.weatherLocations, uniqueValidator()),
          });

          this.form.controls.weatherLocations.controls.forEach(control => control.addValidators(Validators.required));
        }
      });

    this.loading$.subscribe(loading => (loading ? this.form?.disable() : this.form?.enable()));
  }

  public removeLocation(index: number): void {
    this.weatherLocations.removeAt(index);
  }

  public addLocation(): void {
    this.weatherLocations.push(new FormControl<NullableLatLon>({ latitude: null, longitude: null }, Validators.required));
  }

  public dropLocation(event: CdkDragDrop<string[]>): void {
    const currentLocation = this.weatherLocations.at(event.previousIndex);

    this.weatherLocations.removeAt(event.previousIndex);
    this.weatherLocations.insert(event.currentIndex, currentLocation);
  }

  private get weatherLocations(): FormArray<FormControl<NullableLatLon | null>> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form!.get('weatherLocations') as FormArray<FormControl<NullableLatLon | null>>;
  }

  public submit(): void {
    if (this.form?.valid && this.form?.value) {
      this.store.dispatch(SettingsActions.saveSettings({ settings: this.form.value as Settings }));
    }
  }
}
