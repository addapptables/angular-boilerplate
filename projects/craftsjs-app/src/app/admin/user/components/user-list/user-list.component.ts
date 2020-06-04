import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { UserDataSourceService } from '../../services/user-data-source.service';
import { GetUserDto } from '@redux/user/models/get-user-dto.model';
import { Store } from '@ngrx/store';
import * as UserActions from '@redux/user/actions/user.actions';
import { UserDto } from '@redux/user/models/user-dto.model';
import { UserActionService } from '../../services/user-action.service';
import { ListComponentBase } from '../../../../shared/list/list-component-base';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserDataSourceService,
    UserActionService
  ]
})
export class UserListComponent extends ListComponentBase<GetUserDto> {

  @ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  @Input()
  tenantId: string;

  @Input()
  displayedColumns: string[];

  constructor(
    private _store: Store,
    private _userActionService: UserActionService,
    userDataSourceService: UserDataSourceService
  ) {
    super(userDataSourceService);
    this.displayedColumns = userDataSourceService.displayedColumns;
  }

  search(filter: GetUserDto) {
    this.filter.next({ ...filter });
    this._store.dispatch(UserActions.userClearStore());
  }

  getRolesNames(roleNames: string[]) {
    return roleNames.join(',');
  }

  editUser(user: UserDto) {
    this._userActionService.openModalUpsert(user);
  }

  deleteUser(user: UserDto) {
    this._userActionService.deleteUser(user);
  }
}
