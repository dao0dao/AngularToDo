import { AbstractControl, ValidatorFn } from '@angular/forms';

export function IsRequired(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === '' && control.touched) {
      return { IsRequired: true };
    } else {
      return null;
    }
  };
}
export function StartWithSpace(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value.startsWith(' ')) {
      return { StartWithSpace: true };
    } else {
      return null;
    }
  };
}
