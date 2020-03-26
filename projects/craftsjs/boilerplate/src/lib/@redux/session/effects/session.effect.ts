import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import { switchMap, map } from 'rxjs/operators';
import { ofAction } from '@addapptables/ngrx-actions';
import { LoadSession, SessionLoaded } from '../actions/session.action';

@Injectable()
export class SessionEffects {

  constructor(
    private actions$: Actions,
    private sessionService: SessionService
  ) { }

  loadSession$ = createEffect(() => this.actions$.pipe(
    ofAction(LoadSession),
    switchMap(() => {
      return this.sessionService.getLoginInformation().pipe(
        map((loginInformation) => {
          return new SessionLoaded({ loginInformation });
        })
      );
    })));

}
