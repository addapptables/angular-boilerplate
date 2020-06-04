import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { OrganizationUnitService } from '../services/organization-unit.service';
import * as OrganizationActions from '../actions/organization-unit.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';

@Injectable()
export class OrganizationUnitEffects {

  constructor(
    private _actions$: Actions,
    private _organizationUnitService: OrganizationUnitService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(OrganizationActions.loadOrganizationUnits),
    switchMap((action) =>
      this._organizationUnitService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(OrganizationActions.cancelOrganizationUnitRequest))),
        catchError(() => of({ data: [] } as PaginatedModel<OrganizationUnitDto>))
      )
    ),
    map((result) => OrganizationActions.organizationUnitsLoaded({ organizationUnits: result.data }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(OrganizationActions.createOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.create(action.organizationUnit).pipe(
        takeUntil(this._actions$.pipe(ofType(OrganizationActions.cancelOrganizationUnitRequest))),
        map((organizationUnit) => OrganizationActions.organizationUnitCreated({ organizationUnit })),
        catchError(() => of(OrganizationActions.organizationUnitActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(OrganizationActions.updateOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.update(action.organizationUnit).pipe(
        takeUntil(this._actions$.pipe(ofType(OrganizationActions.cancelOrganizationUnitRequest))),
        map((organizationUnit) => OrganizationActions.organizationUnitUpdated({ organizationUnit })),
        catchError(() => of(OrganizationActions.organizationUnitActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(OrganizationActions.deleteOrganizationUnit),
    switchMap((action) =>
      this._organizationUnitService.deleteOrganizationUnit(action.id).pipe(
        takeUntil(this._actions$.pipe(ofType(OrganizationActions.cancelOrganizationUnitRequest))),
        map(() => OrganizationActions.organizationUnitDeleted({ id: action.id })),
        catchError(() => of(OrganizationActions.organizationUnitActionError()))
      )
    )
  ));

}
