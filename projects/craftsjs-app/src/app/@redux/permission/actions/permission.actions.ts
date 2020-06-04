import { createAction, props } from '@ngrx/store';
import { PermissionDto } from '../models/permission-dto.model';

export enum PermissionActionTypes {
  LoadPermissions = '[Permission] Load Permissions',
  CancelLoadPermissions = '[Permission] Cancel Load Permissions',
  PermissionsLoaded = '[Permission] Permissions Loaded'
}

export const loadPermissions = createAction(PermissionActionTypes.LoadPermissions);

export const cancelLoadPermissions = createAction(PermissionActionTypes.CancelLoadPermissions);

export const permissionsLoaded = createAction(PermissionActionTypes.PermissionsLoaded,
  props<{ payload: { permissions: PermissionDto[] } }>());
