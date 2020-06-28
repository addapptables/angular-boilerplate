import { EntityState } from '@ngrx/entity';
import { PermissionDto } from './permission-dto.model';

export interface PermissionStoreModel extends EntityState<PermissionDto> {
    loading: boolean;
    total: number;
}

