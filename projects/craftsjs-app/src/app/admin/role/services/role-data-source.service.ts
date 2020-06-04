import { Injectable } from '@angular/core';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { Store } from '@ngrx/store';
import { selectRoleLoading, selectRoleTotal, selectRolesPage } from '@redux/role/selectors/role.selector';
import * as RoleActions from '@redux/role/actions/role.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { DataSourceBase } from '../../../shared/services/data-source-base';
import { IDataSource } from '../../../shared/list/data-source.interface';
import { GetRoleDto } from '@redux/role/models/get-role-dto.model';

@Injectable()
export class RoleDataSourceService extends DataSourceBase<RoleDto> implements IDataSource<GetRoleDto> {

  public displayedColumns: string[] = ['actions', 'name'];

  constructor(_store: Store) {
    super(_store, selectRoleLoading, selectRoleTotal, RoleActions.cancelRoleRequest());
  }

  load(pageQuery: PageQueryModel, roleInput$: Observable<GetRoleDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectRolesPage,
      roleInput$.pipe(
        map((roleInput) => RoleActions.loadRoles({
          payload: {
            params: {
              ...roleInput,
              skip: pageQuery.index * pageQuery.size,
              take: pageQuery.size
            }
          }
        }))
      ));
  }
}
