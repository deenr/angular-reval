import {AbstractControl, ValidatorFn} from '@angular/forms';

export class PasswordMatchValidator {
  public static createValidator(controlToCheck: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      let result = null;

      if (control.value === '' || control.value === null || control.value === undefined || controlToCheck.errors) {
        return null;
      }

      if (control.value !== controlToCheck.value) {
        return {noMatch: true};
      }

      return result;
    };
  }
}
