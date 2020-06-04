import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { GetRoleDto } from '../models/get-role-dto.model';
import { RoleDto } from '../models/role-dto.model';
import { CreateRoleDto } from '../models/create-role-dto';
import { UpdateRoleDto } from '../models/update-role-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/roles');
  }

  getAll(roleInput: GetRoleDto) {
    return this.get<GetRoleDto, PaginatedModel<RoleDto>>('', roleInput);
  }

  create(role: CreateRoleDto) {
    return this.post<CreateRoleDto, RoleDto>('', role);
  }

  update(role: UpdateRoleDto) {
    return this.put<UpdateRoleDto, RoleDto>('', role);
  }

  deleteRole(id: string) {
    return this.delete(id);
  }
}
