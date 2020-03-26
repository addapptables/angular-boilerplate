import { ConfigurationModel } from '../models/configuration.model';
import { Action } from '@ngrx/store';

export enum ConfigurationActionTypes {
  ConfigurationLoaded = '[Configuration] Configuration Loaded',
}

export class ConfigurationLoaded implements Action {
  readonly type = ConfigurationActionTypes.ConfigurationLoaded;
  constructor(public payload: { configuration: ConfigurationModel }) { }
}
