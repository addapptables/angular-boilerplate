import { RoleStoreModel } from '../models/role-store.model';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../stores/role.store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export const selectRoleState = state => <RoleStoreModel>state.role.store;

export const selectAllRoles = createSelector(
    selectRoleState,
    selectAll
);

export const selectRoleLoading = createSelector(
    selectRoleState,
    state => state.loading
);

export const selectRoleTotal = createSelector(
    selectRoleState,
    state => state.total
);

export const selectRolesPage = (page: PageQueryModel) => createSelector(
    selectAllRoles,
    roles => {
        const start = page.index * page.size;
        const end = start + page.size;
        return roles.slice(start, end);
    }
);

export const selectRoleLoadingAction = createSelector(
    selectRoleState,
    state => state.loadingAction
);

export const selectRoleActionState = createSelector(
    selectRoleState,
    state => state.ActionState
);
