import { createAction, props } from '@ngrx/store';
import { GetOrganizationUnitDto } from '../models/get-organization-unit-dto.model';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { CreateOrganizationUnitDto } from '../models/create-organization-unit-dto.model';
import { UpdateOrganizationUnitDto } from '../models/update-organization-unit-dto.model';

export enum OrganizationUnitActionTypes {
  LoadOrganizationUnits = '[OrganizationUnit] Load OrganizationUnits',
  OrganizationUnitsLoaded = '[OrganizationUnit] OrganizationUnits Loaded',
  CreateOrganizationUnit = '[OrganizationUnit] Create OrganizationUnit',
  OrganizationUnitCreated = '[OrganizationUnit] OrganizationUnit Created',
  UpdateOrganizationUnit = '[OrganizationUnit] Update OrganizationUnit',
  OrganizationUnitUpdated = '[OrganizationUnit] OrganizationUnit Updated',
  DeleteOrganizationUnit = '[OrganizationUnit] Delete OrganizationUnit',
  OrganizationUnitDeleted = '[OrganizationUnit] OrganizationUnit Deleted',
  OrganizationUnitActionComplete = '[OrganizationUnit] OrganizationUnit Action Complete',
  OrganizationUnitActionError = '[OrganizationUnit] OrganizationUnit Action Error',
  OrganizationUnitClearStore = '[OrganizationUnit] OrganizationUnit Clear Store',
  CancelOrganizationUnitRequest = '[OrganizationUnit] Cancel OrganizationUnit Request',
}

export const cancelOrganizationUnitRequest = createAction(OrganizationUnitActionTypes.CancelOrganizationUnitRequest);

export const organizationUnitClearStore = createAction(OrganizationUnitActionTypes.OrganizationUnitClearStore);

export const organizationUnitActionError = createAction(OrganizationUnitActionTypes.OrganizationUnitActionError);

export const organizationUnitActionComplete = createAction(OrganizationUnitActionTypes.OrganizationUnitActionComplete);

export const organizationUnitDeleted = createAction(OrganizationUnitActionTypes.OrganizationUnitDeleted, props<{ id: string }>());

export const deleteOrganizationUnit = createAction(OrganizationUnitActionTypes.DeleteOrganizationUnit, props<{ id: string }>());

export const organizationUnitUpdated = createAction(OrganizationUnitActionTypes.OrganizationUnitUpdated,
  props<{ organizationUnit: OrganizationUnitDto }>());

export const updateOrganizationUnit = createAction(OrganizationUnitActionTypes.UpdateOrganizationUnit,
  props<{ organizationUnit: UpdateOrganizationUnitDto }>());

export const organizationUnitCreated = createAction(OrganizationUnitActionTypes.OrganizationUnitCreated,
  props<{ organizationUnit: OrganizationUnitDto }>());

export const createOrganizationUnit = createAction(OrganizationUnitActionTypes.CreateOrganizationUnit,
  props<{ organizationUnit: CreateOrganizationUnitDto }>());

export const organizationUnitsLoaded = createAction(OrganizationUnitActionTypes.OrganizationUnitsLoaded,
  props<{ organizationUnits: OrganizationUnitDto[] }>());

export const loadOrganizationUnits = createAction(OrganizationUnitActionTypes.LoadOrganizationUnits,
  props<{ filter: GetOrganizationUnitDto }>());
