import { AbstractControl } from '@angular/forms';

export class UtilValidation {
  static required(control: AbstractControl) {
    if (
      control.value === undefined || control.value == null ||
      (typeof control.value === 'string' && !control.value.trim())
    ) {
      return {
        required: true,
      };
    }
    return null;
  }

  static minLengthArray(min: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value && control.value.length >= min) {
        return null;
      }
      return { minLengthArray: { valid: false } };
    };
  }
}
