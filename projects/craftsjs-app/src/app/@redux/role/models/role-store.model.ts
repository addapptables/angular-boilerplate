import { RoleDto } from './role-dto.model';
import { EntityState } from '@ngrx/entity';
import { ActionType } from '@redux/shared/models/action-type.model';

export interface RoleStoreModel extends EntityState<RoleDto> {
    loading: boolean;
    loadingAction: boolean;
    ActionState: ActionType;
    total: number;
}
