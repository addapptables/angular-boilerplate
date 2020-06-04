import { createEntityAdapter, EntityAdapter, Update } from '@ngrx/entity';
import { RoleDto } from '../models/role-dto.model';
import { Store, Action } from '@craftsjs/ngrx-action';
import { RoleStoreModel } from '../models/role-store.model';
import * as RoleActions from '../actions/role.actions';
import { ActionType } from '@redux/shared/models/action-type.model';

export const adapter: EntityAdapter<RoleDto> = createEntityAdapter<RoleDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<RoleStoreModel>(initialState)
export class RoleStore {

    @Action(RoleActions.loadRoles)
    loadRoles(state: RoleStoreModel) {
        return { ...state, loading: true };
    }

    @Action(RoleActions.cancelRoleRequest)
    cancelRoleRequest(state: RoleStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(RoleActions.rolesLoaded)
    rolesLoaded(state: RoleStoreModel, { payload }) {
        return adapter.upsertMany<RoleStoreModel>(payload.roles, {
            ...state,
            loading: false,
            total: payload.totalCount
        });
    }

    @Action(RoleActions.createRole)
    createRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleActions.roleCreated)
    roleCreated(state: RoleStoreModel, { payload: { role } }) {
        return adapter.addOne(role, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(RoleActions.updateRole)
    updateRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleActions.roleUpdated)
    roleUpdated(state: RoleStoreModel, { payload: { role } }) {
        const updateRole = {
            id: role.id,
            changes: role
        } as Update<RoleDto>;
        return adapter.updateOne(updateRole, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(RoleActions.roleActionComplete)
    roleActionComplete(state: RoleStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(RoleActions.roleActionError)
    roleActionError(state: RoleStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(RoleActions.deleteRole)
    deleteRole(state: RoleStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(RoleActions.roleDeleted)
    roleDeleted(state: RoleStoreModel, { payload: { id } }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(RoleActions.roleClearStore)
    roleClearStore(state: RoleStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
