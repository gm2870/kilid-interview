import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { FormProps, ErrorMessages } from './employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  getValidationErrors(
    group: FormGroup,
    validationMessages: FormProps
  ): ErrorMessages {
    let formErrors = {} as ErrorMessages;

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key as keyof ErrorMessages] = '';

      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key as keyof ErrorMessages] +=
              validationMessages[key as keyof FormProps][errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        const groupError = this.getValidationErrors(
          abstractControl,
          validationMessages
        );
        formErrors = { ...formErrors, ...groupError };
      }
    });
    return formErrors;
  }

  matchConfirmItems(
    controlName: string,
    confirmControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const confirmControl = formGroup.get(confirmControlName);

      if (!control || !confirmControl) {
        return null;
      }

      if (confirmControl.errors && !confirmControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
      return null;
    };
  }
}
