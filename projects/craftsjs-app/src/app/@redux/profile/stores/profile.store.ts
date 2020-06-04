import { Store, Action } from '@craftsjs/ngrx-action';
import { ProfileStoreModel } from '../models/profile-store.model';
import { ProfileDto } from '../models/profile-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import * as ProfileActions from '../actions/profile.actions';


@Store<ProfileStoreModel>({
    profile: {} as ProfileDto,
    ActionState: ActionType.none,
    loading: false,
    loadingAction: false
})
export class ProfileStore {

    @Action(ProfileActions.loadProfile)
    loadProfile(state: ProfileStoreModel) {
        return { ...state, loading: true };
    }

    @Action(ProfileActions.profileLoaded)
    profileLoaded(state: ProfileStoreModel, { payload: { profile } }) {
        return { ...state, loading: false, profile };
    }

    @Action(ProfileActions.updateProfile)
    UpdateProfile(state: ProfileStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ProfileActions.profileUpdated)
    profileUpdated(state: ProfileStoreModel, { payload: { profile } }) {
        return { ...state, loadingAction: false, profile, ActionState: ActionType.success };
    }

    @Action(ProfileActions.cancelProfileRequest)
    cancelProfileRequest(state: ProfileStoreModel) {
        return { ...state, loadingAction: false, loading: false };
    }

    @Action(ProfileActions.profileActionComplete)
    profileActionComplete(state: ProfileStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(ProfileActions.profileActionError)
    profileActionError(state: ProfileStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(ProfileActions.profileClearStore)
    profileClearStore(state: ProfileStoreModel) {
        return { ...state, loadingAction: false, loading: false, profile: {}, ActionState: ActionType.none };
    }

}
