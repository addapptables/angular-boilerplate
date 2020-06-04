import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ModalService } from '@craftsjs/modal';
import { RoleFormModalComponent } from '../role-form-modal/role-form-modal.component';
import { Store } from '@ngrx/store';
import * as RoleActions from '@redux/role/actions/role.actions';

@Component({
  selector: 'app-role-layout',
  templateUrl: './role-layout.component.html',
  styleUrls: ['./role-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleLayoutComponent implements OnDestroy {

  constructor(
    private _store: Store,
    private _modalService: ModalService
  ) { }

  createRole() {
    this._modalService.show(RoleFormModalComponent, {});
  }

  ngOnDestroy(): void {
    this._store.dispatch(RoleActions.roleClearStore());
  }

}
