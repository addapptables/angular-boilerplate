import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrganizationActions from '@redux/organization-unit/actions/organization-unit.actions';
import { OrganizationUnitActionService } from '../../services/organization-unit-action.service';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';

@Component({
  selector: 'app-organization-unit-layout',
  templateUrl: './organization-unit-layout.component.html',
  styleUrls: ['./organization-unit-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitLayoutComponent implements OnDestroy {

  organizationUnitId: string;

  constructor(
    private _store: Store,
    private _organizationUnitActionService: OrganizationUnitActionService
  ) { }

  createOrganizationUnit() {
    this._organizationUnitActionService.openModalUpsert({} as OrganizationUnitDto);
  }

  ngOnDestroy(): void {
    this._store.dispatch(OrganizationActions.organizationUnitClearStore());
  }
}
