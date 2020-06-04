import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { TenantDto } from '../models/tenant-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@craftsjs/ngrx-action';
import { TenantStoreModel } from '../models/tenant-store.model';
import * as TenantActions from '../actions/tenant.actions';

export const adapter: EntityAdapter<TenantDto> = createEntityAdapter<TenantDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<TenantStoreModel>(initialState)
export class TenantStore {

    @Action(TenantActions.loadTenants)
    loadTenants(state: TenantStoreModel) {
        return { ...state, loading: true };
    }

    @Action(TenantActions.cancelTenantRequest)
    cancelTenantRequest(state: TenantStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(TenantActions.tenantsLoaded)
    tenantsLoaded(state: TenantStoreModel, { tenants, total }) {
        return adapter.upsertMany<TenantStoreModel>(tenants, {
            ...state,
            loading: false,
            total
        });
    }

    @Action(TenantActions.createTenant)
    createTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantActions.tenantCreated)
    tenantCreated(state: TenantStoreModel, { tenant }) {
        return adapter.addOne(tenant, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(TenantActions.updateTenant)
    updateTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantActions.tenantUpdated)
    tenantUpdated(state: TenantStoreModel, { tenant }) {
        const update = {
            id: tenant.id,
            changes: tenant
        } as Update<TenantDto>;
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(TenantActions.tenantActionComplete)
    tenantActionComplete(state: TenantStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(TenantActions.tenantActionError)
    tenantActionError(state: TenantStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(TenantActions.deleteTenant)
    deleteTenant(state: TenantStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(TenantActions.tenantDeleted)
    tenantDeleted(state: TenantStoreModel, { id }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(TenantActions.tenantClearStore)
    tenantClearStore(state: TenantStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
