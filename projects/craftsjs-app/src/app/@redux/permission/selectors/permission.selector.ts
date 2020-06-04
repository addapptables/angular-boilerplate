
import { createSelector } from '@ngrx/store';
import { PermissionStoreModel } from '../models/permission-store.model';

export const selectPermissionState = state => <PermissionStoreModel>state.permissions.store;

export const selectAllPermissions = createSelector(
    selectPermissionState,
    store => store.permissions
);

export const selectPermissionsLoading = createSelector(
    selectPermissionState,
    store => store.loading
);
