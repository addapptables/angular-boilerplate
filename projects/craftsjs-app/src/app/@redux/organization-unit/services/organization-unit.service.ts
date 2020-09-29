import { Injectable, Injector } from '@angular/core';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { CreateOrganizationUnitDto } from '../models/create-organization-unit-dto.model';
import { UpdateOrganizationUnitDto } from '../models/update-organization-unit-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetOrganizationUnitDto } from '../models/get-organization-unit-dto.model';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { OrganizationUnitRoleDto } from '../models/roles/organization-unit-role.dto';
import { AddRolesToOrganizationUnitDto } from '../models/roles/add-roles-to-organization-unit-dto';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/organization-units');
  }

  getAll(input: GetOrganizationUnitDto) {
    return this.get<GetOrganizationUnitDto, PaginatedModel<OrganizationUnitDto>>('', input);
  }

  getRolesAssociateToOrganizationUnit(organizationUnitId: string) {
    const url = `roles/${organizationUnitId}/associate`;
    return this.get<OrganizationUnitRoleDto[]>(url);
  }

  getRoleOrganizationUnits() {
    const url = 'user/organization-units';
    return this.get<OrganizationUnitDto[]>(url);
  }

  getRoles(organizationUnitId: string) {
    const url = `roles/${organizationUnitId}`;
    return this.get<RoleDto[]>(url);
  }

  addRoles(input: AddRolesToOrganizationUnitDto) {
    return this.post<AddRolesToOrganizationUnitDto, OrganizationUnitRoleDto[]>('add-roles', input);
  }

  deleteRole(id: string) {
    const urlSend = this._url + '/roles/' + id;
    return this._http.delete(urlSend);
  }

  create(input: CreateOrganizationUnitDto) {
    return this.post<CreateOrganizationUnitDto, OrganizationUnitDto>('', input);
  }

  update(input: UpdateOrganizationUnitDto) {
    return this.put<UpdateOrganizationUnitDto, OrganizationUnitDto>('', input);
  }

  deleteOrganizationUnit(id: string) {
    return this.delete(id);
  }
}
