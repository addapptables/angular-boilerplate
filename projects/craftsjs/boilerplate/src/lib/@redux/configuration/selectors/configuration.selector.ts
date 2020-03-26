import { ConfigurationStoreModel } from '../models/configuration-store.model';
import { createSelector } from '@ngrx/store';


export const selectConfigurationState = state => state.configuration.store as ConfigurationStoreModel;

export const selectConfiguration = createSelector(
  selectConfigurationState,
  configurationStore => configurationStore.configuration
);
