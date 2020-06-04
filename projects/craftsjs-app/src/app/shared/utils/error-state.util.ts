import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty && control.parent.dirty);
    const invalidParent = !!(control && control.dirty && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}
