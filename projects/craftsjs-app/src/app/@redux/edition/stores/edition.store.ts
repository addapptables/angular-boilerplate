import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { ActionType } from '@redux/shared/models/action-type.model';
import { EditionStoreModel } from '../models/edition-store.model';
import { EditionDto } from '../models/edition-dto.model';
import * as _ from 'lodash';
import {
    loadEditions, cancelEditionRequest, editionsLoaded,
    createEdition, editionCreated, updateEdition,
    editionUpdated, editionActionComplete, editionActionError,
    deleteEdition, editionDeleted, editionClearStore
} from '../actions/edition.actions';

export const adapter: EntityAdapter<EditionDto> = createEntityAdapter<EditionDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<EditionStoreModel>(initialState)
export class EditionStore {

    @Action(loadEditions)
    loadEditions(state: EditionStoreModel) {
        return { ...state, loading: true };
    }

    @Action(cancelEditionRequest)
    cancelEditionRequest(state: EditionStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(editionsLoaded)
    editionsLoaded(state: EditionStoreModel, { payload }) {
        return adapter.upsertMany<EditionStoreModel>(payload.editions, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(createEdition)
    createEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(editionCreated)
    editionCreated(state: EditionStoreModel, { payload: { edition } }) {
        return adapter.addOne(edition, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(updateEdition)
    updateEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(editionUpdated)
    editionUpdated(state: EditionStoreModel, { payload: { edition } }) {
        const entities = _.pickBy(state.entities, (_, key) => key !== edition.id);
        const ids = (state.ids as string[]).filter(id => id !== edition.id);
        return adapter.upsertOne(edition, {
            ...state,
            entities,
            ids,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(editionActionComplete)
    editionActionComplete(state: EditionStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(editionActionError)
    editionActionError(state: EditionStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(deleteEdition)
    deleteEdition(state: EditionStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(editionDeleted)
    editionDeleted(state: EditionStoreModel, { payload: { id } }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(editionClearStore)
    userClearStore(state: EditionStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
