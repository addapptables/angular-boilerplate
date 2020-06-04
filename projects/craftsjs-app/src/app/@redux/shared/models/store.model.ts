import { EntityState } from '@ngrx/entity';
import { ActionType } from './action-type.model';

export interface StoreModel<T> extends EntityState<T> {
    loading: boolean;
    loadingAction: boolean;
    ActionState: ActionType;
    total: number;
}
