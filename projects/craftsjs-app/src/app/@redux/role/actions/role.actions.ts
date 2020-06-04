import { createAction, props } from '@ngrx/store';
import { RoleDto } from '../models/role-dto.model';
import { GetRoleDto } from '../models/get-role-dto.model';
import { CreateRoleDto } from '../models/create-role-dto';
import { UpdateRoleDto } from '../models/update-role-dto';

export enum RoleActionTypes {
  LoadRoles = '[Role] Load Roles',
  CancelRoleRequest = '[Role] Cancel Role Request',
  RolesLoaded = '[Role] RolesLoaded',
  CreateRole = '[Role] Create Role',
  RoleCreated = '[Role] Role created',
  UpdateRole = '[Role] Update Role',
  RoleUpdated = '[Role] Role Updated',
  RoleActionComplete = '[Role] Role Action Complete',
  RoleActionError = '[Role] Role Action Error',
  DeleteRole = '[Role] Delete Role',
  RoleDeleted = '[Role] Role Deleted',
  RoleClearStore = '[Role] Role Clear Store'
}

export const loadRoles = createAction(RoleActionTypes.LoadRoles, props<{ payload: { params: GetRoleDto } }>());

export const cancelRoleRequest = createAction(RoleActionTypes.CancelRoleRequest);

export const rolesLoaded = createAction(RoleActionTypes.RolesLoaded, props<{ payload: { roles: RoleDto[], totalCount: number } }>());

export const createRole = createAction(RoleActionTypes.CreateRole, props<{ payload: { role: CreateRoleDto } }>());

export const roleCreated = createAction(RoleActionTypes.RoleCreated, props<{ payload: { role: RoleDto } }>());

export const updateRole = createAction(RoleActionTypes.UpdateRole, props<{ payload: { role: UpdateRoleDto } }>());

export const roleUpdated = createAction(RoleActionTypes.RoleUpdated, props<{ payload: { role: RoleDto } }>());

export const roleActionComplete = createAction(RoleActionTypes.RoleActionComplete);

export const roleActionError = createAction(RoleActionTypes.RoleActionError);

export const deleteRole = createAction(RoleActionTypes.DeleteRole, props<{ payload: { id: string } }>());

export const roleDeleted = createAction(RoleActionTypes.RoleDeleted, props<{ payload: { id: string } }>());

export const roleClearStore = createAction(RoleActionTypes.RoleClearStore);
