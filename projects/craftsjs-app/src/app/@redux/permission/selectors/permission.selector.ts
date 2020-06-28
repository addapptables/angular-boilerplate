
import { createSelector } from '@ngrx/store';
import { PermissionStoreModel } from '../models/permission-store.model';
import { selectAll } from '../stores/permission.store';

export const selectPermissionState = state => <PermissionStoreModel>state.permissions.store;

export const selectAllPermissions = createSelector(
    selectPermissionState,
    selectAll
);

export const selectPermissionsLoading = createSelector(
    selectPermissionState,
    store => store.loading
);
