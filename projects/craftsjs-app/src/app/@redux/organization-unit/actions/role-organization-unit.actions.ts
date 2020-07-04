import { createAction, props } from '@ngrx/store';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';


export enum RoleOrganizationUnitActionTypes {
    LoadRoleOrganizationUnits = '[RoleOrganizationUnit] Load RoleOrganizationUnits',
    RoleOrganizationUnitsLoaded = '[RoleOrganizationUnit] RoleOrganizationUnits Loaded',
    RoleOrganizationUnitClearStore = '[RoleOrganizationUnit] RoleOrganizationUnit Clear Store',
    CancelRoleOrganizationUnitRequest = '[RoleOrganizationUnit] Cancel RoleOrganizationUnit Request',
    selectRoleOrganizationUnits = '[RoleOrganizationUnit] Select RoleOrganizationUnits',
}


export const cancelRoleOrganizationUnitRequest = createAction(RoleOrganizationUnitActionTypes.CancelRoleOrganizationUnitRequest);

export const roleOrganizationUnitClearStore = createAction(RoleOrganizationUnitActionTypes.RoleOrganizationUnitClearStore);

export const roleOrganizationUnitsLoaded = createAction(RoleOrganizationUnitActionTypes.RoleOrganizationUnitsLoaded,
    props<{ organizationUnits: OrganizationUnitDto[] }>());

export const loadRoleOrganizationUnits = createAction(RoleOrganizationUnitActionTypes.LoadRoleOrganizationUnits);

export const selectRoleOrganizationUnit = createAction(RoleOrganizationUnitActionTypes.selectRoleOrganizationUnits,
    props<{ organizationUnit: OrganizationUnitDto }>());