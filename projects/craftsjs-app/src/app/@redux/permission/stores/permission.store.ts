import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { PermissionStoreModel } from '../models/permission-store.model';
import * as PermissionActions from '../actions/permission.actions';
import { PermissionDto } from '../models/permission-dto.model';

export const adapter: EntityAdapter<PermissionDto> = createEntityAdapter<PermissionDto>();

const initialState = adapter.getInitialState({
    loading: false,
    total: 0
});

@Store<PermissionStoreModel>(initialState)
export class PermissionStore {

    @Action(PermissionActions.loadPermissions)
    loadPermissions(state: PermissionStoreModel) {
        return { ...state, loading: true };
    }

    @Action(PermissionActions.permissionsLoaded)
    permissionsLoaded(state: PermissionStoreModel, { payload: { permissions } }) {
        return adapter.upsertMany<PermissionStoreModel>(permissions, {
            ...state,
            loading: false,
            total: permissions.length
        });
    }

}

export const {
    selectAll
} = adapter.getSelectors();
