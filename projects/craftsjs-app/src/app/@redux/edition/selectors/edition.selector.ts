import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { EditionStoreModel } from '../models/edition-store.model';
import { selectAll } from '../stores/edition.store';


export const selectEditionState = state => state.edition.store as EditionStoreModel;

export const selectAllEditions = createSelector(
    selectEditionState,
    selectAll
);

export const selectEditionLoading = createSelector(
    selectEditionState,
    state => state.loading
);

export const selectEditionTotal = createSelector(
    selectEditionState,
    state => state.total
);

export const selectEditionsPage = (page: PageQueryModel) => createSelector(
    selectAllEditions,
    editions => {
        const start = page.index * page.size;
        const end = start + page.size;
        return editions.slice(start, end);
    }
);

export const selectEditionLoadingAction = createSelector(
    selectEditionState,
    state => state.loadingAction
);

export const selectEditionActionState = createSelector(
    selectEditionState,
    state => state.ActionState
);
