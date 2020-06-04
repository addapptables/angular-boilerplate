import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from '@angular/core';
import {
  selectOrganizationUnitLoadingAction,
  selectOrganizationUnitActionState
} from '@redux/organization-unit/selectors/organization-unit.selector';
import * as OrganizationActions from '@redux/organization-unit/actions/organization-unit.actions';
import { FormGroup, Validators } from '@angular/forms';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { FormBase } from '../../../../shared/forms/form-base';
import { UtilValidation } from '../../../../shared/utils/util-validation';

@Component({
  selector: 'app-organization-unit-form',
  templateUrl: './organization-unit-form.component.html',
  styleUrls: ['./organization-unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitFormComponent extends FormBase implements OnInit {

  readonly maxDisplayNameLength = 128;

  formGroup: FormGroup;

  @Input()
  organizationUnitDto: OrganizationUnitDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectOrganizationUnitLoadingAction,
      selectOrganizationUnitActionState, OrganizationActions.organizationUnitActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.organizationUnitDto.id],
      name: [this.organizationUnitDto.name, [UtilValidation.required, Validators.maxLength(this.maxDisplayNameLength)]],
      parentId: [this.organizationUnitDto.parentId]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const organizationUnitDto = this.formGroup.value;
    if (organizationUnitDto.id) {
      this._store.dispatch(OrganizationActions.updateOrganizationUnit({ organizationUnit: organizationUnitDto }));
    } else {
      this._store.dispatch(OrganizationActions.createOrganizationUnit({ organizationUnit: organizationUnitDto }));
    }
  }
}
