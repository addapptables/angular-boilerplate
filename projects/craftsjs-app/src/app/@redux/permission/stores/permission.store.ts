import { PermissionStoreModel } from '../models/permission-store.model';
import * as PermissionActions from '../actions/permission.actions';
import { Store, Action } from '@craftsjs/ngrx-action';


@Store<PermissionStoreModel>({
    loading: false,
    permissions: []
})
export class PermissionStore {

    @Action(PermissionActions.loadPermissions)
    loadPermissions(state: PermissionStoreModel) {
        return { ...state, loading: true };
    }

    @Action(PermissionActions.permissionsLoaded)
    permissionsLoaded(state: PermissionStoreModel, { payload: { permissions } }) {
        return { ...state, permissions, loading: false };
    }

}
