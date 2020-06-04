import { Injectable, Injector } from '@angular/core';
import { GetTenantDto } from '../models/get-tenant-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { TenantDto } from '../models/tenant-dto.model';
import { CreateTenantDto } from '../models/create-tenant-dto.model';
import { UpdateTenantDto } from '../models/update-tenant-dto.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/tenants');
  }

  getAll(input: GetTenantDto) {
    return this.get<GetTenantDto, PaginatedModel<TenantDto>>('', input);
  }

  isTenantAvailable(input: GetTenantDto) {
    return this.get<GetTenantDto, TenantDto>('findOne/isTenantAvailable', input);
  }

  create(input: CreateTenantDto) {
    return this.post<CreateTenantDto, TenantDto>('', input);
  }

  update(input: UpdateTenantDto) {
    return this.put<UpdateTenantDto, TenantDto>('', input);
  }

  deleteTenant(id: string) {
    return this.delete(id);
  }
}
