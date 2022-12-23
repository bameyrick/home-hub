import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEqual } from '@qntm-code/utils';

export function uniqueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      Array.isArray(control.value) &&
      control.value.length > 1 &&
      control.value.some((valueA, indexA) =>
        (control.value as unknown[]).find((valueB, indexB) => indexB !== indexA && isEqual(valueA, valueB))
      )
    ) {
      return {
        unique: true,
      };
    }

    return null;
  };
}
