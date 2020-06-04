import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TenantService } from '../services/tenant.service';
import * as TenantActions from '../actions/tenant.actions';
import { switchMap, catchError, takeUntil, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { TenantDto } from '../models/tenant-dto.model';

@Injectable()
export class TenantEffects {

  constructor(
    private _actions$: Actions,
    private _tenantService: TenantService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(TenantActions.loadTenants),
    switchMap((action) =>
      this._tenantService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(TenantActions.cancelTenantRequest))),
        catchError(() => of({ total: 0, data: [] } as PaginatedModel<TenantDto>))
      )
    ),
    map((result) => TenantActions.tenantsLoaded({ tenants: result.data, total: result.total }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(TenantActions.createTenant),
    switchMap((action) =>
      this._tenantService.create(action.tenant).pipe(
        takeUntil(this._actions$.pipe(ofType(TenantActions.cancelTenantRequest))),
        map((tenant) => TenantActions.tenantCreated({ tenant })),
        catchError(() => of(TenantActions.tenantActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(TenantActions.updateTenant),
    switchMap((action) =>
      this._tenantService.update(action.tenant).pipe(
        takeUntil(this._actions$.pipe(ofType(TenantActions.cancelTenantRequest))),
        map((tenant) => TenantActions.tenantUpdated({ tenant })),
        catchError(() => of(TenantActions.tenantActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(TenantActions.deleteTenant),
    switchMap((action) =>
      this._tenantService.deleteTenant(action.id).pipe(
        takeUntil(this._actions$.pipe(ofType(TenantActions.cancelTenantRequest))),
        map(() => TenantActions.tenantDeleted({ id: action.id })),
        catchError(() => of(TenantActions.tenantActionError()))
      )
    )
  ));

}
