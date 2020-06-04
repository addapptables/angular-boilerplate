import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilValidation } from '../../../../../../shared/utils/util-validation';
import { AssociationRoleToOrganizationUnitSelect } from '../../../../models/association-role-to-organization-unit-select.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { OrganizationUnitService } from '@redux/organization-unit/services/organization-unit.service';
import { takeUntil, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-role-organization-unit-form',
  templateUrl: './role-organization-unit-form.component.html',
  styleUrls: ['./role-organization-unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleOrganizationUnitFormComponent implements OnInit, OnDestroy {

  @Input()
  organizationUnitId: string;

  rolesSelected: string[] = [];

  formGroup: FormGroup;

  loading = new BehaviorSubject(false);

  loading$ = this.loading.asObservable();

  unsubscribeAll = new Subject();

  @Output()
  save = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      organizationUnitId: [this.organizationUnitId, [Validators.required]],
      roles: [null, [UtilValidation.minLengthArray(1)]]
    });
  }

  onRolesSelected($event: AssociationRoleToOrganizationUnitSelect[]) {
    this.rolesSelected = $event.map(x => x.id);
    this.formGroup.get('roles').patchValue(this.rolesSelected);
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this.loading.next(true);
    const formValue = this.formGroup.value;
    this._organizationUnitService.addRoles(formValue).pipe(
      takeUntil(this.unsubscribeAll),
      finalize(() => this.loading.next(false)),
      tap(() => this.save.emit())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
