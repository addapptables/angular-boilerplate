import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.actions';
import { switchMap, catchError, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserDto } from '../models/user-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';

@Injectable()
export class UserEffects {

  constructor(
    private _actions$: Actions,
    private _userService: UserService
  ) { }

  $loadUsers = createEffect(() => this._actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap((action) =>
      this._userService.getAll(action.payload.params).pipe(
        takeUntil(this._actions$.pipe(ofType(UserActions.cancelUserRequest))),
        catchError(() => of({ data: [], total: 0 } as PaginatedModel<UserDto>))
      )
    ),
    map((result) => UserActions.usersLoaded({ payload: { users: result.data, total: result.total } }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(UserActions.createUser),
    switchMap((action) =>
      this._userService.create(action.payload.user).pipe(
        takeUntil(this._actions$.pipe(ofType(UserActions.cancelUserRequest))),
        map((user) => UserActions.userCreated({ payload: { user } })),
        catchError(() => of(UserActions.userActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(UserActions.updateUser),
    switchMap((action) =>
      this._userService.update(action.payload.user).pipe(
        takeUntil(this._actions$.pipe(ofType(UserActions.cancelUserRequest))),
        map((user) => UserActions.userUpdated({ payload: { user } })),
        catchError(() => of(UserActions.userActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(UserActions.deleteUser),
    switchMap((action) =>
      this._userService.deleteUser(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofType(UserActions.cancelUserRequest))),
        map(() => UserActions.userDeleted({ payload: { id: action.payload.id } })),
        catchError(() => of(UserActions.userActionError()))
      )
    )
  ));

}
