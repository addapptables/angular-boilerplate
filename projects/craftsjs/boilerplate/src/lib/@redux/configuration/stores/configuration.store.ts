import { Store, Action } from '@addapptables/ngrx-actions';
import { ConfigurationStoreModel } from '../models/configuration-store.model';
import { ConfigurationLoaded } from '../actions/configuration.action';

@Store<ConfigurationStoreModel>({
  configuration: {} as any
})
export class ConfigurationStore {

  @Action(ConfigurationLoaded)
  configurationLoaded(state: ConfigurationStoreModel, { payload: { configuration } }: ConfigurationLoaded) {
    return { ...state, loading: false, configuration };
  }

}
