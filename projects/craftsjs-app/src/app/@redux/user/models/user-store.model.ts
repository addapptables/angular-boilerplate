import { UserDto } from './user-dto.model';
import { StoreModel } from '@redux/shared/models/store.model';

export interface UserStoreModel extends StoreModel<UserDto> { }
