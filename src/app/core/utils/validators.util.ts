import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap } from "rxjs/operators";

import { ValidationService } from '../services/validation.service';


function isEmptyInputValue(value: string | null): boolean {
  // we don't check for string here so it also works with arrays
  return value === null || value.length === 0;
}

function isEmpty(value: string | null): boolean {
  return value === null || value.length === 0;
}

function hasNumber(myString: string) {
  return /\d/.test(myString);
}

function hasUpper(myString: string) {
  return /[A-Z]/.test(myString);
}

function hasLower(myString: string) {
  return /[a-z]/.test(myString);
}

@Injectable({
  providedIn: "root"
})

export class CustomValidator {
  constructor(private validationService: ValidationService) { }

  existingEmailValidator(initialEmail: string = ""): AsyncValidatorFn {
    return (control: AbstractControl): | Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      if (isEmptyInputValue(control.value)) {
        return of(null);

      } else if (control.value === initialEmail) {
        return of(null);

      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ => this.validationService.isDupe(control.value).pipe(map(r => r ? { existingEmail: { value: control.value } } : null)))
        );
      }
    };
  }

  domainValidator(initialEmail: string = ""): AsyncValidatorFn {
    return (control: AbstractControl): | Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      if (isEmptyInputValue(control.value)) {
        return of(null);

      } else if (control.value === initialEmail) {
        return of(null);

      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ => this.validationService.isDomainValid(control.value).pipe(map(r => r ? null : { invalidDomain: { value: control.value } })))
        );
      }
    };
  }
}

export function PasswordNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isEmpty(control.value)) return null;
    return hasNumber(control.value) ? null : { 'passwordNoNumber': true };
  };
}

export function PasswordUpperValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isEmpty(control.value)) return null;
    return hasUpper(control.value) ? null : { 'passwordNoUpper': true };
  };
}

export function PasswordLowerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isEmpty(control.value)) return null;
    return hasLower(control.value) ? null : { 'passwordNoLower': true };
  };
}


export const ConfirmPasswordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password')!;
  const confirm = control.get('confirm')!;

  if (confirm.value != password.value) {
    confirm.setErrors({ confirmPassword: true });
    return { confirmPassword: true };
  }
  return null;
};
