import { Injectable, Injector } from '@angular/core';
import { GetUserDto } from '../models/get-user-dto.model';
import { UserDto } from '../models/user-dto.model';
import { CreateUserDto } from '../models/create-user-dto.model';
import { UpdateUserDto } from '../models/update-user-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ChangePasswordDto } from '../models/change-password-dto.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/users');
  }

  getAll(getUserDto: GetUserDto) {
    return this.get<GetUserDto, PaginatedModel<UserDto>>('', getUserDto);
  }

  create(createUserDto: CreateUserDto) {
    return this.post<CreateUserDto, UserDto>('', createUserDto);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.put<UpdateUserDto, UserDto>('', updateUserDto);
  }

  deleteUser(id: string) {
    return this.delete(id);
  }

  changePassword(input: ChangePasswordDto) {
    return this.put<ChangePasswordDto, boolean>('profile/update/change-password', input);
  }

  changeOrganizationUnit(organizationUnitId: string) {
    return this.put<any, any>('update/last-organization-unit', { organizationUnitId });
  }
}
