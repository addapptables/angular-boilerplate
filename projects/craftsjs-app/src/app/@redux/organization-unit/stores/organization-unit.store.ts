import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { Store, Action } from '@craftsjs/ngrx-action';
import { OrganizationUnitStoreModel } from '../models/organization-unit-store.model';
import * as OrganizationUnitActions from '../actions/organization-unit.actions';

export const adapter: EntityAdapter<OrganizationUnitDto> = createEntityAdapter<OrganizationUnitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<OrganizationUnitStoreModel>(initialState)
export class OrganizationUnitStore {

    @Action(OrganizationUnitActions.loadOrganizationUnits)
    loadOrganizationUnits(state: OrganizationUnitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(OrganizationUnitActions.cancelOrganizationUnitRequest)
    cancelOrganizationUnitRequest(state: OrganizationUnitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(OrganizationUnitActions.organizationUnitsLoaded)
    organizationUnitsLoaded(state: OrganizationUnitStoreModel, { organizationUnits }) {
        return adapter.upsertMany<OrganizationUnitStoreModel>(organizationUnits, {
            ...state,
            loading: false
        });
    }

    @Action(OrganizationUnitActions.createOrganizationUnit)
    createOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitActions.organizationUnitCreated)
    organizationUnitCreated(state: OrganizationUnitStoreModel, { organizationUnit }) {
        return adapter.addOne(organizationUnit, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(OrganizationUnitActions.updateOrganizationUnit)
    updateOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitActions.organizationUnitUpdated)
    organizationUnitUpdated(state: OrganizationUnitStoreModel, { organizationUnit }) {
        const update = {
            id: organizationUnit.id,
            changes: organizationUnit
        } as Update<OrganizationUnitDto>;
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(OrganizationUnitActions.organizationUnitActionComplete)
    organizationUnitActionComplete(state: OrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(OrganizationUnitActions.organizationUnitActionError)
    organizationUnitActionError(state: OrganizationUnitStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(OrganizationUnitActions.deleteOrganizationUnit)
    deleteOrganizationUnit(state: OrganizationUnitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(OrganizationUnitActions.organizationUnitDeleted)
    organizationUnitDeleted(state: OrganizationUnitStoreModel, { id }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false
        });
    }

    @Action(OrganizationUnitActions.organizationUnitClearStore)
    organizationUnitClearStore(state: OrganizationUnitStoreModel) {
        return adapter.removeAll({ ...state });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
