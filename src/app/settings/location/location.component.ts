import { Component, forwardRef } from '@angular/core';
import { AsyncValidator, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { NullableLatLon } from '@home-hub/common';
import { isNullOrUndefined } from '@qntm-code/utils';
import { firstValueFrom } from 'rxjs';
import { ControlAbstract } from '../../abstracts';

@Component({
  selector: 'fieldset[home-hub-location]',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationComponent),
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => LocationComponent),
      multi: true,
    },
  ],
})
export class LocationComponent extends ControlAbstract<NullableLatLon> implements AsyncValidator {
  public async onLatitudeChange(latitude: number): Promise<void> {
    this.setValue({ ...(await firstValueFrom(this.value$)), latitude });
  }

  public async onLongitudeChange(longitude: number): Promise<void> {
    this.setValue({ ...(await firstValueFrom(this.value$)), longitude });
  }

  public async currentLocation(): Promise<void> {
    const location = await this.getCurrentLocation();

    this.setValue(location);
  }

  private async getCurrentLocation(): Promise<NullableLatLon> {
    return new Promise<NullableLatLon>(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.error(error);
          resolve({ latitude: null, longitude: null });
        }
      );
    });
  }

  public async validate(): Promise<ValidationErrors> {
    const errors: ValidationErrors = {};
    const value = await firstValueFrom(this.value$);

    if (this.required && Object.values(value).some(v => isNullOrUndefined(v))) {
      errors['required'] = true;
    }

    return errors;
  }
}
