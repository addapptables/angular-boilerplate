import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@craftsjs/ngrx-action';
import { OrganizationUnitStoreModel } from '../models/organization-unit-store.model';
import * as OrganizationUnitActions from '../actions/role-organization-unit.actions';

export const adapter: EntityAdapter<OrganizationUnitDto> = createEntityAdapter<OrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0,
    selectedOrganizationUnit: undefined
});

@Store<OrganizationUnitStoreModel>(initialState)
export class RoleOrganizationUnitStore {

    @Action(OrganizationUnitActions.loadRoleOrganizationUnits)
    loadOrganizationUnits(state: OrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(OrganizationUnitActions.selectRoleOrganizationUnit)
    selectedOrganizationUnit(state: OrganizationUnitStoreModel, { organizationUnit }) {
        return { ...state, selectedOrganizationUnit: organizationUnit };
    }

    @Action(OrganizationUnitActions.cancelRoleOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: OrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(OrganizationUnitActions.roleOrganizationUnitsLoaded)
    organizationUnitsLoaded(state: OrganizationUnitStoreModel, { organizationUnits }) {
        return adapter.upsertMany<OrganizationUnitStoreModel>(organizationUnits, {
            ...state,
            loading: false
        });
    }

    @Action(OrganizationUnitActions.roleOrganizationUnitClearStore)
    organizationUnitClearStore(state: OrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
