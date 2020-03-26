import { ActionType } from '../enum/action-type.enum';
import { LoginInformationDto } from './login-information-dto.model';

export interface SessionStoreModel {
  loading: boolean;
  ActionState: ActionType;
  loginInformation: LoginInformationDto;
}
