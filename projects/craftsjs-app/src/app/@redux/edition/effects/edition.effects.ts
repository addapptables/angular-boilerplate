import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditionService } from '../services/edition.service';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { EditionDto } from '../models/edition-dto.model';
import * as editionActions from '../actions/edition.actions';

@Injectable()
export class EditionEffects {

  constructor(
    private _actions$: Actions,
    private _editionService: EditionService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(editionActions.loadEditions),
    switchMap((action) =>
      this._editionService.getAll(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(editionActions.cancelEditionRequest))),
        catchError(() => of({ total: 0, data: [] } as PaginatedModel<EditionDto>))
      )
    ),
    map((result) => editionActions.editionsLoaded({ payload: { editions: result.data, total: result.total } }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(editionActions.createEdition),
    switchMap((action) =>
      this._editionService.create(action.payload.edition).pipe(
        takeUntil(this._actions$.pipe(ofType(editionActions.cancelEditionRequest))),
        map((edition) => editionActions.editionCreated({ payload: { edition } })),
        catchError(() => of(editionActions.editionActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(editionActions.updateEdition),
    switchMap((action) =>
      this._editionService.update(action.payload.edition).pipe(
        takeUntil(this._actions$.pipe(ofType(editionActions.cancelEditionRequest))),
        map((edition) => editionActions.editionUpdated({ payload: { edition } })),
        catchError(() => of(editionActions.editionActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(editionActions.deleteEdition),
    switchMap((action) =>
      this._editionService.deleteEdition(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofType(editionActions.cancelEditionRequest))),
        map(() => editionActions.editionDeleted({ payload: { id: action.payload.id } })),
        catchError(() => of(editionActions.editionActionError()))
      )
    )
  ));

}
