import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CraftsState { }

export const reducers: ActionReducerMap<CraftsState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<CraftsState>[] = !environment.production ? [] : [];
