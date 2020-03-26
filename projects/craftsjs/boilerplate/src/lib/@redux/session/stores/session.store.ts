import { Store, Action } from '@addapptables/ngrx-actions';
import { ActionType } from '../enum/action-type.enum';
import { LoginInformationDto } from '../models/login-information-dto.model';
import { SessionStoreModel } from '../models/session-store.model';
import { LoadSession, SessionLoaded } from '../actions/session.action';

@Store<SessionStoreModel>({
  loading: false,
  ActionState: ActionType.none,
  loginInformation: {}
})
export class SessionStore {

  @Action(LoadSession)
  loadSession(state: LoginInformationDto) {
    return { ...state, loading: true };
  }

  @Action(SessionLoaded)
  sessionLoaded(state: LoginInformationDto, { payload: { loginInformation } }: SessionLoaded) {
    return { ...state, loading: false, loginInformation };
  }

}
