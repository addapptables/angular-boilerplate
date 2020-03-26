import { Action } from '@ngrx/store';
import { LoginInformationDto } from '../models/login-information-dto.model';

export enum SessionActionTypes {
  LoadSession = '[Session] Load Session',
  SessionLoaded = '[Session] Session Loaded',
}

export class LoadSession implements Action {
  readonly type = SessionActionTypes.LoadSession;
}

export class SessionLoaded implements Action {
  readonly type = SessionActionTypes.SessionLoaded;
  constructor(public payload: { loginInformation: LoginInformationDto }) { }
}
