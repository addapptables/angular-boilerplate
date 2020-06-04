import { Injectable } from '@angular/core';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { GetTenantDto } from '@redux/tenant/models/get-tenant-dto.model';
import { Store } from '@ngrx/store';
import { selectTenantLoading, selectTenantTotal, selectTenantsPage } from '@redux/tenant/selectors/tenant.selector';
import * as TenantActions from '@redux/tenant/actions/tenant.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceBase } from '../../../shared/services/data-source-base';
import { IDataSource } from '../../../shared/list/data-source.interface';

@Injectable()
export class TenantDataSourceService extends DataSourceBase<TenantDto> implements IDataSource<GetTenantDto> {

  public displayedColumns: string[] = ['actions', 'name', 'subDomain', 'isActive'];

  constructor(_store: Store) {
    super(_store, selectTenantLoading, selectTenantTotal, TenantActions.cancelTenantRequest());
  }

  load(pageQuery: PageQueryModel, getTenantDto$: Observable<GetTenantDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectTenantsPage,
      getTenantDto$.pipe(
        map((getUserDto) => TenantActions.loadTenants({
          filter: {
            ...getUserDto,
            skip: pageQuery.index * pageQuery.size,
            take: pageQuery.size
          }
        }))
      ));
  }
}
