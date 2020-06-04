import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { UserDto } from '../models/user-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import { UserStoreModel } from '../models/user-store.model';
import * as UserActions from '../actions/user.actions';

export const adapter: EntityAdapter<UserDto> = createEntityAdapter<UserDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<UserStoreModel>(initialState)
export class UserStore {

    @Action(UserActions.loadUsers)
    loadUsers(state: UserStoreModel) {
        return { ...state, loading: true };
    }

    @Action(UserActions.cancelUserRequest)
    cancelUserRequest(state: UserStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(UserActions.usersLoaded)
    usersLoaded(state: UserStoreModel, { payload }) {
        return adapter.upsertMany<UserStoreModel>(payload.users, {
            ...state,
            loading: false,
            total: payload.total
        });
    }

    @Action(UserActions.createUser)
    createUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserActions.userCreated)
    userCreated(state: UserStoreModel, { payload: { user } }) {
        return adapter.addOne(user, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UserActions.updateUser)
    updateUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserActions.userUpdated)
    userUpdated(state: UserStoreModel, { payload: { user } }) {
        const update = {
            id: user.id,
            changes: user
        } as Update<UserDto>;
        return adapter.updateOne(update, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(UserActions.userActionComplete)
    userActionComplete(state: UserStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(UserActions.userActionError)
    userActionError(state: UserStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(UserActions.deleteUser)
    deleteUser(state: UserStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(UserActions.userDeleted)
    userDeleted(state: UserStoreModel, { payload: { id } }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(UserActions.userClearStore)
    userClearStore(state: UserStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
