import { Component, OnInit, Input, ChangeDetectionStrategy, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CreateRoleDto } from '@redux/role/models/create-role-dto';
import * as RoleActions from '@redux/role/actions/role.actions';
import { selectRoleLoadingAction, selectRoleActionState, } from '@redux/role/selectors/role.selector';
import { FormBase } from '../../../../shared/forms/form-base';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { UtilValidation } from '../../../../shared/utils/util-validation';
import { UpdateRoleDto } from '@redux/role/models/update-role-dto';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormComponent extends FormBase implements OnInit {

  readonly maxLength = 32;

  readonly maxLengthDescription = 5000;

  formFirstStep: FormGroup;

  formFinalStep: FormGroup;

  @Input()
  roleDto: RoleDto;

  constructor(injector: Injector) {
    super(injector, selectRoleLoadingAction, selectRoleActionState, RoleActions.roleActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this._initFirstStep();
    this._initFinalStep();
  }

  private _initFirstStep() {
    this.formFirstStep = this._fb.group({
      name: [this.roleDto.name, [UtilValidation.required, Validators.maxLength(this.maxLength)]]
    });
  }

  private _initFinalStep() {
    this.formFinalStep = this._fb.group({
      permissions: [this.roleDto.permissions]
    });
  }

  submit() {
    const roleDto = { id: this.roleDto.id, ...this.formFirstStep.value, ...this.formFinalStep.value };
    if (roleDto.id) {
      this._update(roleDto);
    } else {
      this._create(roleDto);
    }
  }

  private _create(role: CreateRoleDto) {
    this._store.dispatch(RoleActions.createRole({ payload: { role } }));
  }

  private _update(role: UpdateRoleDto) {
    this._store.dispatch(RoleActions.updateRole({ payload: { role } }));
  }

}
