import { Injectable, Injector } from '@angular/core';
import { ModalService } from '@craftsjs/modal';
import * as OrganizationActions from '@redux/organization-unit/actions/organization-unit.actions';
import { selectOrganizationUnitActionState } from '@redux/organization-unit/selectors/organization-unit.selector';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { OrganizationUnitFormModalComponent } from '../components/organization-unit-form-modal/organization-unit-form-modal.component';
import { ActionBaseService } from '../../../shared/services/action-base.service';

@Injectable()
export class OrganizationUnitActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, OrganizationActions.organizationUnitActionComplete(), selectOrganizationUnitActionState);
  }

  openModalUpsert(organizationUnit: OrganizationUnitDto) {
    this._modalService.show(OrganizationUnitFormModalComponent, organizationUnit);
  }

  deleteOrganizationUnit(organizationUnit: OrganizationUnitDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('organizationUnit.areYouSure', { title: organizationUnit.name }),
      OrganizationActions.deleteOrganizationUnit({ id: organizationUnit.id })
    );
  }
}
