import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import * as UserActions from '@redux/user/actions/user.actions';
import * as RoleActions from '@redux/role/actions/role.actions';
import { UserActionService } from '../../services/user-action.service';
import { UserDto } from '@redux/user/models/user-dto.model';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnDestroy {

  private _actionsDestroy: Action[];

  constructor(
    private _store: Store,
    private _userActionService: UserActionService
  ) {
    this._actionsDestroy = [
      UserActions.userClearStore(),
      RoleActions.roleClearStore(),
      RoleActions.cancelRoleRequest()
    ];
  }

  createUser() {
    this._userActionService.openModalUpsert({} as UserDto);
  }

  ngOnDestroy(): void {
    this._actionsDestroy.forEach(x => this._store.dispatch(x));
  }

}
