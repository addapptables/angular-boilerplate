import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import * as ProfileActions from '../actions/profile.actions';
import { switchMap, takeUntil, catchError, map, filter, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {

  loading: boolean;

  constructor(
    private _actions$: Actions,
    private _profileService: ProfileService
  ) { }

  loadProfile$ = createEffect(() => this._actions$.pipe(
    ofType(ProfileActions.loadProfile),
    filter(() => !this.loading),
    switchMap(() => {
      this.loading = true;
      return this._profileService.getProfile().pipe(
        takeUntil(this._actions$.pipe(ofType(ProfileActions.cancelProfileRequest))),
        finalize(() => this.loading = false),
        map((profile) => {
          return ProfileActions.profileLoaded({ payload: { profile } });
        }),
        catchError(() => of(ProfileActions.cancelProfileRequest()))
      );
    })));

  @Effect()
  updateProfile$ = this._actions$.pipe(
    ofType(ProfileActions.updateProfile),
    switchMap((action) =>
      this._profileService.update(action.payload.profile).pipe(
        takeUntil(this._actions$.pipe(ofType(ProfileActions.cancelProfileRequest))),
        map((profile) => {
          return ProfileActions.profileUpdated({ payload: { profile } });
        }),
        catchError(() => of(ProfileActions.profileActionError()))
      )
    )
  );

}
