import { Injectable } from '@angular/core';
import { UserDto } from '@redux/user/models/user-dto.model';
import { GetUserDto } from '@redux/user/models/get-user-dto.model';
import { Store } from '@ngrx/store';
import { selectUserLoading, selectUserTotal, selectUsersPage } from '@redux/user/selectors/user.selector';
import { Observable } from 'rxjs';
import * as UserActions from '@redux/user/actions/user.actions';
import { map } from 'rxjs/operators';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { IDataSource } from '../../../shared/list/data-source.interface';
import { DataSourceBase } from '../../../shared/services/data-source-base';

@Injectable()
export class UserDataSourceService extends DataSourceBase<UserDto> implements IDataSource<GetUserDto> {

  public displayedColumns: string[] = ['actions', 'userName', 'fullName', 'emailAddress', 'phoneNumber', 'isActive'];

  constructor(_store: Store) {
    super(_store, selectUserLoading, selectUserTotal, UserActions.cancelUserRequest());
  }

  load(pageQuery: PageQueryModel, getUserDto$: Observable<GetUserDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectUsersPage,
      getUserDto$.pipe(
        map((getUserDto) => UserActions.loadUsers({
          payload: {
            params: {
              ...getUserDto,
              skip: pageQuery.index * pageQuery.size,
              take: pageQuery.size
            }
          }
        }))
      ));
  }
}
