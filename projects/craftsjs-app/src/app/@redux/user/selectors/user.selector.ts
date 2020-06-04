import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { UserStoreModel } from '../models/user-store.model';
import { selectAll } from '../stores/user.store';

export const selectUserState = state => state.user.store as UserStoreModel;

export const selectAllUsers = createSelector(
    selectUserState,
    selectAll
);

export const selectUserLoading = createSelector(
    selectUserState,
    state => state.loading
);

export const selectUserTotal = createSelector(
    selectUserState,
    state => state.total
);

export const selectUsersPage = (page: PageQueryModel) => createSelector(
    selectAllUsers,
    users => {
        const start = page.index * page.size;
        const end = start + page.size;
        return users.slice(start, end);
    }
);

export const selectUserLoadingAction = createSelector(
    selectUserState,
    state => state.loadingAction
);

export const selectUserActionState = createSelector(
    selectUserState,
    state => state.ActionState
);
