import { Injectable, Injector } from '@angular/core';
import * as TenantActions from '@redux/tenant/actions/tenant.actions';
import { selectTenantActionState } from '@redux/tenant/selectors/tenant.selector';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { ModalService } from '@craftsjs/modal';
import { TenantFormModalComponent } from '../components/tenant-form-modal/tenant-form-modal.component';
import { UserListImpersonationComponent } from '../components/tenant-list/user-list-impersonation/user-list-impersonation.component';
import { ActionBaseService } from '../../../shared/services/action-base.service';

@Injectable()
export class TenantActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, TenantActions.tenantActionComplete(), selectTenantActionState);
  }

  openModalUpsert(tenant: TenantDto) {
    this._modalService.show(TenantFormModalComponent, tenant);
  }

  openModalImpersonation(tenantId: number) {
    this._modalService.show(UserListImpersonationComponent, tenantId);
  }

  deleteTenant(tenant: TenantDto) {
    this.delete(
      this._translateService.translate('general.delete'),
      this._translateService.translate('tenant.areYouSure', { title: tenant.name }),
      TenantActions.deleteTenant({ id: tenant.id })
    );
  }
}
