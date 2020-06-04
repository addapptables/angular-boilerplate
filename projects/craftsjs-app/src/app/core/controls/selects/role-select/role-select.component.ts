import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef, Optional, Self } from '@angular/core';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { selectAllRoles } from '@redux/role/selectors/role.selector';
import * as RoleActions from '@redux/role/actions/role.actions';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: RoleSelectComponent }
  ]
})
export class RoleSelectComponent extends BaseControlValueAccessor<string | string[]> implements OnInit {

  roles$: Observable<RoleDto[]>;

  @Input()
  customClass;

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl,
    private _store: Store
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
  }

  ngOnInit(): void {
    this.roles$ = this._store.pipe(
      select(selectAllRoles)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [({ id: null, name: '--' } as RoleDto), ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(RoleActions.loadRoles({ payload: { params: { skip: 0, take: 1000 } } }));
        } else if (!this.multiple && data.length === 1) {
          this._store.dispatch(RoleActions.loadRoles({ payload: { params: { skip: 0, take: 1000 } } }));
        }
      })
    );
  }
}
