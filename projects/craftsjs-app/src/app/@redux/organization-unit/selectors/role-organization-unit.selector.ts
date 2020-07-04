import { createSelector } from '@ngrx/store';
import { OrganizationUnitStoreModel } from '../models/organization-unit-store.model';
import { selectAll } from '../stores/role-organization-unit.store';


export const selectRoleOrganizationUnitState = state => state.roleOrganizationUnit.store as OrganizationUnitStoreModel;

export const selectAllRoleOrganizationUnits = createSelector(
    selectRoleOrganizationUnitState,
    selectAll
);

export const selectRoleOrganizationUnit = createSelector(
    selectRoleOrganizationUnitState,
    state => state.selectedOrganizationUnit
);

export const selectRoleOrganizationUnitLoading = createSelector(
    selectRoleOrganizationUnitState,
    state => state.loading
);
