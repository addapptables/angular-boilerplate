import { createAction, props } from '@ngrx/store';
import { ProfileDto } from '../models/profile-dto.model';
import { UpdateProfileDto } from '../models/update-profile-dto.model';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profile',
  ProfileLoaded = '[Profile] ProfileLoaded',
  UpdateProfile = '[Profile] Update Profile',
  ProfileUpdated = '[Profile] Profile Updated',
  CancelProfileRequest = '[Profile] Cancel Profile Request',
  ProfileActionComplete = '[Profile] Profile Action Complete',
  ProfileActionError = '[Profile] Profile Action Error',
  ProfileClearStore = '[Profile] Profile Clear Store',
}

export const profileClearStore = createAction(ProfileActionTypes.ProfileClearStore);

export const profileActionError = createAction(ProfileActionTypes.ProfileActionError);

export const profileActionComplete = createAction(ProfileActionTypes.ProfileActionComplete);

export const loadProfile = createAction(ProfileActionTypes.LoadProfile);

export const profileLoaded = createAction(ProfileActionTypes.ProfileLoaded, props<{ payload: { profile: ProfileDto } }>());

export const updateProfile = createAction(ProfileActionTypes.UpdateProfile, props<{ payload: { profile: UpdateProfileDto } }>());

export const profileUpdated = createAction(ProfileActionTypes.ProfileUpdated, props<{ payload: { profile: ProfileDto } }>());

export const cancelProfileRequest = createAction(ProfileActionTypes.CancelProfileRequest);
