import { NgModule, APP_INITIALIZER, Injector, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { SessionStore } from './@redux/session/stores/session.store';
import { SessionEffects } from './@redux/session/effects/session.effect';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { appInitializerFactory } from './app-initializer-factory';
import { CONFIGURATION_BOILERPLATE, IS_PRODUCTION } from './tokens';
import { ConfigurationStore } from './@redux/configuration/stores/configuration.store';
import { BoilerplateModel } from './models/boilerplate.model';

@NgModule({
  imports: [
    ReduxRegisterModule.forFeature('session', { store: SessionStore }),
    ReduxRegisterModule.forFeature('configuration', { store: ConfigurationStore }),
    EffectsModule.forFeature([SessionEffects])
  ]
})
export class BoilerplateModule {

  static forRoot(boilerplateModel: BoilerplateModel = { isProduction: false }): ModuleWithProviders {
    return {
      ngModule: BoilerplateModule,
      providers: [
        InitialConfigurationService,
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [Injector],
          multi: true
        },
        {
          provide: CONFIGURATION_BOILERPLATE,
          useFactory: (initialConfigurationService: InitialConfigurationService) => {
            return initialConfigurationService.configuration;
          },
          deps: [InitialConfigurationService]
        },
        {
          provide: IS_PRODUCTION,
          useValue: boilerplateModel.isProduction,
        }
      ]
    };
  }

}
