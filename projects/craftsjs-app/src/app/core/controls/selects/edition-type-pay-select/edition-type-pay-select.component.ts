import { Component, ChangeDetectionStrategy, Input, Self, Optional, ElementRef } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edition-type-pay-select',
  templateUrl: './edition-type-pay-select.component.html',
  styleUrls: ['./edition-type-pay-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: EditionTypePaySelectComponent }
  ],
})
export class EditionTypePaySelectComponent extends BaseControlValueAccessor<string> {

  @Input()
  customClass;

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
  }
}
