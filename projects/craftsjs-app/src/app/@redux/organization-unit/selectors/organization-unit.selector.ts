import { createSelector } from '@ngrx/store';
import { OrganizationUnitStoreModel } from '../models/organization-unit-store.model';
import { selectAll } from '../stores/organization-unit.store';


export const selectOrganizationUnitState = state => state.organizationUnit.store as OrganizationUnitStoreModel;

export const selectAllOrganizationUnits = createSelector(
    selectOrganizationUnitState,
    selectAll
);

export const selectOrganizationUnitLoading = createSelector(
    selectOrganizationUnitState,
    state => state.loading
);

export const selectOrganizationUnitLoadingAction = createSelector(
    selectOrganizationUnitState,
    state => state.loadingAction
);

export const selectOrganizationUnitActionState = createSelector(
    selectOrganizationUnitState,
    state => state.ActionState
);
