import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { TenantStoreModel } from '../models/tenant-store.model';
import { selectAll } from '../stores/tenant.store';


export const selectTenantState = state => state.tenant.store as TenantStoreModel;

export const selectAllTenants = createSelector(
    selectTenantState,
    selectAll
);

export const selectTenantLoading = createSelector(
    selectTenantState,
    state => state.loading
);

export const selectTenantTotal = createSelector(
    selectTenantState,
    state => state.total
);

export const selectTenantsPage = (page: PageQueryModel) => createSelector(
    selectAllTenants,
    tenants => {
        const start = page.index * page.size;
        const end = start + page.size;
        return tenants.slice(start, end);
    }
);

export const selectTenantLoadingAction = createSelector(
    selectTenantState,
    state => state.loadingAction
);

export const selectTenantActionState = createSelector(
    selectTenantState,
    state => state.ActionState
);
