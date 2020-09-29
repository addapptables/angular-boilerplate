import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PermissionService } from '../services/permission.service';
import * as PermissionActions from '../actions/permission.actions';
import { switchMap, catchError, map, withLatestFrom, filter, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { PermissionDto } from '../models/permission-dto.model';
import { Store, select } from '@ngrx/store';
import { selectAllPermissions } from '../selectors/permission.selector';


@Injectable()
export class PermissionEffects {

  constructor(
    private _actions$: Actions,
    private _permissionService: PermissionService,
    private _store: Store
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(PermissionActions.loadPermissions),
    withLatestFrom(this._store.pipe(select(selectAllPermissions))),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter(([_, allPermissions]) => allPermissions.length === 0),
    switchMap(() =>
      this._permissionService.getAll().pipe(
        takeUntil(this._actions$.pipe(ofType(PermissionActions.cancelLoadPermissions))),
        catchError(() => of([] as PermissionDto[]))
      )),
    map(permissions => PermissionActions.permissionsLoaded({ payload: { permissions } }))
  ));
}
