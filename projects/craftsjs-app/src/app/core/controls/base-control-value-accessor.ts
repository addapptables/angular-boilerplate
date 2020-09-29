import { ControlValueAccessor, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Input, OnDestroy, DoCheck, ElementRef, Optional, Self, HostBinding, Output, EventEmitter, Directive } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CanDisableCtor, HasTabIndexCtor, CanDisableRippleCtor, CanUpdateErrorStateCtor,
  mixinDisableRipple, mixinTabIndex, mixinDisabled, mixinErrorState, ErrorStateMatcher
} from '@angular/material/core';

let nextUniqueId = 0;

class MatSelectBase {
  constructor(
    public _elementRef: ElementRef,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) { }
}

const _MatSelectMixinBase:
  CanDisableCtor &
  HasTabIndexCtor &
  CanDisableRippleCtor &
  CanUpdateErrorStateCtor &
  typeof MatSelectBase =
  mixinDisableRipple(mixinTabIndex(mixinDisabled(mixinErrorState(MatSelectBase))));

@Directive()
export class BaseControlValueAccessor<T> extends
  _MatSelectMixinBase implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy, DoCheck {

  value: any;

  private _placeholder: string;

  private _multiple: boolean;

  private _required = false;

  focused = false;

  stateChanges = new Subject<any>();

  id = `select-${nextUniqueId++}`;

  controlType = 'select';

  valueSubject = new BehaviorSubject<T>(null);

  value$ = this.valueSubject.asObservable();

  disabled: boolean;

  @HostBinding('attr.aria-describedby')
  _ariaDescribedby: string;

  @Output()
  changeValue = new EventEmitter<T>();

  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value: boolean) {
    this._multiple = value;
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this.value;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm,
      _parentFormGroup, ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (_: any) => { };
  onTouched: any = () => { };

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  onChange($event) {
    this.valueSubject.next($event.value);
    this.value = $event.value;
    this.propagateChange($event.value);
    this.stateChanges.next();
    this.changeValue.emit($event.value);
  }

  openedChange($event: boolean) {
    if ($event) {
      this.focused = true;
    } else {
      this.focused = false;
    }
    this.onTouched();
    this.stateChanges.next();
  }

  writeValue(obj: any): void {
    this.valueSubject.next(obj);
    this.value = obj;
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onContainerClick(): void { }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
