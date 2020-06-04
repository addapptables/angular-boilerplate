import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { RoleService } from '../services/role.service';
import * as RoleActions from '../actions/role.actions';
import { switchMap, catchError, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { RoleDto } from '../models/role-dto.model';

@Injectable()
export class RoleEffects {

  constructor(
    private _actions$: Actions,
    private _roleService: RoleService
  ) { }

  $load = createEffect(() => this._actions$.pipe(
    ofType(RoleActions.loadRoles),
    switchMap((action) =>
      this._roleService.getAll(action.payload.params).pipe(
        takeUntil(this._actions$.pipe(ofType(RoleActions.cancelRoleRequest))),
        catchError(() => of({ total: 0, data: [] } as PaginatedModel<RoleDto>))
      )
    ),
    map(result => RoleActions.rolesLoaded({ payload: { roles: result.data, totalCount: result.total } }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(RoleActions.createRole),
    switchMap((action) =>
      this._roleService.create(action.payload.role).pipe(
        takeUntil(this._actions$.pipe(ofType(RoleActions.cancelRoleRequest))),
        map((role) => RoleActions.roleCreated({ payload: { role } })),
        catchError(() => of(RoleActions.roleActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(RoleActions.updateRole),
    switchMap((action) =>
      this._roleService.update(action.payload.role).pipe(
        takeUntil(this._actions$.pipe(ofType(RoleActions.cancelRoleRequest))),
        map((role) => RoleActions.roleUpdated({ payload: { role } })),
        catchError(() => of(RoleActions.roleActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(RoleActions.deleteRole),
    switchMap((action) =>
      this._roleService.deleteRole(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofType(RoleActions.cancelRoleRequest))),
        map(() => RoleActions.roleDeleted({ payload: { id: action.payload.id } })),
        catchError(() => of(RoleActions.roleActionError()))
      )
    )
  ));
}
