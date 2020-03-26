import { InjectionToken } from '@angular/core';
import { ConfigurationModel } from './@redux/configuration/models/configuration.model';

export const CONFIGURATION_BOILERPLATE = new InjectionToken<ConfigurationModel>('CONFIGURATION_BOILERPLATE');

export const IS_PRODUCTION = new InjectionToken<ConfigurationModel>('IS_PRODUCTION');
