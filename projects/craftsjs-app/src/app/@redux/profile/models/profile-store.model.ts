import { ProfileDto } from './profile-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';

export interface ProfileStoreModel {
    loading: boolean;
    loadingAction: boolean;
    ActionState: ActionType;
    profile: ProfileDto;
}
