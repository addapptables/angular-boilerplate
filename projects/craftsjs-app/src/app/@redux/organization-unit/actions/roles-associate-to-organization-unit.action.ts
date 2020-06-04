import { createAction, props } from '@ngrx/store';
import { OrganizationUnitRoleDto } from '../models/roles/organization-unit-role.dto';

export enum RolesAssociateToOrganizationUnitActionTypes {
  Load = '[RolesAssociateToOrganizationUnit] Load RolesAssociateToOrganizationUnit',
  Loaded = '[RolesAssociateToOrganizationUnit] RolesAssociateToOrganizationUnit Loaded',
  ClearStore = '[RolesAssociateToOrganizationUnit] RolesAssociateToOrganizationUnit Clear Store',
  CancelRequest = '[RolesAssociateToOrganizationUnit] Cancel RolesAssociateToOrganizationUnit Request',
}

export const cancelRequest = createAction(RolesAssociateToOrganizationUnitActionTypes.CancelRequest);

export const clearStore = createAction(RolesAssociateToOrganizationUnitActionTypes.ClearStore);

export const load = createAction(RolesAssociateToOrganizationUnitActionTypes.Load);

export const loaded = createAction(RolesAssociateToOrganizationUnitActionTypes.Load,
  props<{ organizations: OrganizationUnitRoleDto[], total: number }>());
