import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import * as RoleOrganizationActions from '../actions/role-organization-unit.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';

@Injectable()
export class RoleOrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(RoleOrganizationActions.loadRoleOrganizationUnits),
    switchMap(() =>
      this._organizationUnitService.getRoleOrganizationUnits().pipe(
        takeUntil(this._actions$.pipe(ofType(RoleOrganizationActions.cancelRoleOrganizationUnitRequest))),
        catchError(() => of([] as OrganizationUnitDto[]))
      )
    ),
    map((result) => RoleOrganizationActions.roleOrganizationUnitsLoaded({ organizationUnits: result }))
  ));

}
