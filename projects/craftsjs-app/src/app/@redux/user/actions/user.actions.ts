import { createAction, props } from '@ngrx/store';
import { GetUserDto } from '../models/get-user-dto.model';
import { UserDto } from '../models/user-dto.model';
import { CreateUserDto } from '../models/create-user-dto.model';
import { UpdateUserDto } from '../models/update-user-dto.model';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  UsersLoaded = '[User] Users Loaded',
  CreateUser = '[User] Create User',
  UserCreated = '[User] User Created',
  UpdateUser = '[User] Update User',
  UserUpdated = '[User] User Updated',
  DeleteUser = '[User] Delete User',
  UserDeleted = '[User] User Deleted',
  CancelUserRequest = '[User] Cancel User Request',
  UserActionComplete = '[User] User Action Complete',
  UserActionError = '[User] User Action Error',
  UserClearStore = '[User] User Clear Store',
}

export const loadUsers = createAction(UserActionTypes.LoadUsers, props<{ payload: { params: GetUserDto } }>());

export const usersLoaded = createAction(UserActionTypes.UsersLoaded, props<{ payload: { users: UserDto[], total: number } }>());

export const createUser = createAction(UserActionTypes.CreateUser, props<{ payload: { user: CreateUserDto } }>());

export const userCreated = createAction(UserActionTypes.UserCreated, props<{ payload: { user: UserDto } }>());

export const updateUser = createAction(UserActionTypes.UpdateUser, props<{ payload: { user: UpdateUserDto } }>());

export const userUpdated = createAction(UserActionTypes.UserUpdated, props<{ payload: { user: UserDto } }>());

export const deleteUser = createAction(UserActionTypes.DeleteUser, props<{ payload: { id: string } }>());

export const userDeleted = createAction(UserActionTypes.UserDeleted, props<{ payload: { id: string } }>());

export const cancelUserRequest = createAction(UserActionTypes.CancelUserRequest);

export const userActionComplete = createAction(UserActionTypes.UserActionComplete);

export const userActionError = createAction(UserActionTypes.UserActionError);

export const userClearStore = createAction(UserActionTypes.UserClearStore);
