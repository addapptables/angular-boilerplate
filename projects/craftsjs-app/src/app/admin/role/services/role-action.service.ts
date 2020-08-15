import { Injectable, Injector } from '@angular/core';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { ModalService } from '@craftsjs/modal';
import { RoleFormModalComponent } from '../component/role-form-modal/role-form-modal.component';
import * as RoleActions from '@redux/role/actions/role.actions';
import { selectRoleActionState } from '@redux/role/selectors/role.selector';
import { ActionBaseService } from '../../../shared/services/action-base.service';

@Injectable()
export class RoleActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService,
  ) {
    super(injector, RoleActions.roleActionComplete(), selectRoleActionState);
  }

  edit(role: RoleDto) {
    this._modalService.show(RoleFormModalComponent, role);
  }

  deleteRole(role: RoleDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('role.areYouSure', { title: role.name }),
      RoleActions.deleteRole({ payload: { id: role.id } })
    );
  }
}
