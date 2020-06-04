import { createAction, props } from '@ngrx/store';
import { EditionDto } from '../models/edition-dto.model';
import { GetEditionDto } from '../models/get-edition-dto.model';
import { CreateEditionDto } from '../models/create-edition-dto.model';
import { UpdateEditionDto } from '../models/update-edition-dto.model';

export enum EditionActionTypes {
  LoadEditions = '[Edition] Load Editions',
  EditionsLoaded = '[Edition] Editions Loaded',
  CreateEdition = '[Edition] Create Edition',
  EditionCreated = '[Edition] Edition Created',
  UpdateEdition = '[Edition] Update Edition',
  EditionUpdated = '[Edition] Edition Updated',
  DeleteEdition = '[Edition] Delete Edition',
  EditionDeleted = '[Edition] Edition Deleted',
  EditionActionComplete = '[Edition] Edition Action Complete',
  EditionActionError = '[Edition] Edition Action Error',
  EditionClearStore = '[Edition] Edition Clear Store',
  CancelEditionRequest = '[Edition] Cancel Edition Request',
}

export const cancelEditionRequest = createAction(EditionActionTypes.CancelEditionRequest);

export const editionClearStore = createAction(EditionActionTypes.EditionClearStore);

export const editionActionError = createAction(EditionActionTypes.EditionActionError);

export const editionActionComplete = createAction(EditionActionTypes.EditionActionComplete);

export const editionDeleted = createAction(EditionActionTypes.EditionDeleted, props<{ payload: { id: string } }>());

export const deleteEdition = createAction(EditionActionTypes.DeleteEdition, props<{ payload: { id: string } }>());

export const editionUpdated = createAction(EditionActionTypes.EditionUpdated, props<{ payload: { edition: EditionDto } }>());

export const updateEdition = createAction(EditionActionTypes.UpdateEdition, props<{ payload: { edition: UpdateEditionDto } }>());

export const editionCreated = createAction(EditionActionTypes.EditionCreated, props<{ payload: { edition: EditionDto } }>());

export const createEdition = createAction(EditionActionTypes.CreateEdition, props<{ payload: { edition: CreateEditionDto } }>());

export const editionsLoaded = createAction(EditionActionTypes.EditionsLoaded,
  props<{ payload: { editions: EditionDto[], total: number } }>());

export const loadEditions = createAction(EditionActionTypes.LoadEditions, props<{ payload: { filter: GetEditionDto } }>());
