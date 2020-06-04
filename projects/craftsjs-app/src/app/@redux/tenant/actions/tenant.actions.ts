import { createAction, props } from '@ngrx/store';
import { TenantDto } from '../models/tenant-dto.model';
import { UpdateTenantDto } from '../models/update-tenant-dto.model';
import { CreateTenantDto } from '../models/create-tenant-dto.model';
import { GetTenantDto } from '../models/get-tenant-dto.model';

export enum TenantActionTypes {
  LoadTenants = '[Tenant] Load Tenants',
  TenantsLoaded = '[Tenant] Tenants Loaded',
  CreateTenant = '[Tenant] Create Tenant',
  TenantCreated = '[Tenant] Tenant Created',
  UpdateTenant = '[Tenant] Update Tenant',
  TenantUpdated = '[Tenant] Tenant Updated',
  DeleteTenant = '[Tenant] Delete Tenant',
  TenantDeleted = '[Tenant] Tenant Deleted',
  TenantActionComplete = '[Tenant] Tenant Action Complete',
  TenantActionError = '[Tenant] Tenant Action Error',
  TenantClearStore = '[Tenant] Tenant Clear Store',
  CancelTenantRequest = '[Tenant] Cancel Tenant Request',
}

export const cancelTenantRequest = createAction(TenantActionTypes.CancelTenantRequest);

export const tenantClearStore = createAction(TenantActionTypes.TenantClearStore);

export const tenantActionError = createAction(TenantActionTypes.TenantActionError);

export const tenantActionComplete = createAction(TenantActionTypes.TenantActionComplete);

export const tenantDeleted = createAction(TenantActionTypes.TenantDeleted, props<{ id: string }>());

export const deleteTenant = createAction(TenantActionTypes.DeleteTenant, props<{ id: string }>());

export const tenantUpdated = createAction(TenantActionTypes.TenantUpdated, props<{ tenant: TenantDto }>());

export const updateTenant = createAction(TenantActionTypes.UpdateTenant, props<{ tenant: UpdateTenantDto }>());

export const tenantCreated = createAction(TenantActionTypes.TenantCreated, props<{ tenant: TenantDto }>());

export const createTenant = createAction(TenantActionTypes.CreateTenant, props<{ tenant: CreateTenantDto }>());

export const tenantsLoaded = createAction(TenantActionTypes.TenantsLoaded, props<{ tenants: TenantDto[], total: number }>());

export const loadTenants = createAction(TenantActionTypes.LoadTenants, props<{ filter: GetTenantDto }>());
