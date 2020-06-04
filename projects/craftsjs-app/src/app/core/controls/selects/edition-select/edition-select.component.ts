import {
  Component, OnInit, ChangeDetectionStrategy
  , Input, Self, Optional, ElementRef
} from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { MatFormFieldControl } from '@angular/material/form-field';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { selectAllEditions } from '@redux/edition/selectors/edition.selector';
import * as EditionActions from '@redux/edition/actions/edition.actions';

@Component({
  selector: 'app-edition-select',
  templateUrl: './edition-select.component.html',
  styleUrls: ['./edition-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: EditionSelectComponent }
  ]
})
export class EditionSelectComponent extends BaseControlValueAccessor<string | string[]> implements OnInit {

  editions$: Observable<EditionDto[]>;

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
    this.editions$ = this._store.pipe(
      select(selectAllEditions)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [{ id: null, name: '--' } as EditionDto, ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(EditionActions.loadEditions({ payload: { filter: { skip: 0, take: 1000 } } }));
        } else if (!this.multiple && data.length === 1) {
          this._store.dispatch(EditionActions.loadEditions({ payload: { filter: { skip: 0, take: 1000 } } }));
        }
      })
    );
  }
}
