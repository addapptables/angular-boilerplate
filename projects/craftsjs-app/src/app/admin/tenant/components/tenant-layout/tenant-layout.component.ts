import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import * as TenantActions from '@redux/tenant/actions/tenant.actions';
import * as EditionActions from '@redux/edition/actions/edition.actions';
import { TenantActionService } from '../../services/tenant-action.service';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';

@Component({
  selector: 'app-tenant-layout',
  templateUrl: './tenant-layout.component.html',
  styleUrls: ['./tenant-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantLayoutComponent implements OnDestroy {

  private _actionsDestroy: Action[];

  constructor(
    private _store: Store,
    private _tenantActionService: TenantActionService
  ) {
    this._actionsDestroy = [
      TenantActions.tenantClearStore(),
      EditionActions.cancelEditionRequest(),
      EditionActions.editionClearStore()
    ];
  }

  createTenant() {
    this._tenantActionService.openModalUpsert({} as TenantDto);
  }

  ngOnDestroy(): void {
    this._actionsDestroy.forEach(x => this._store.dispatch(x));
  }
}
