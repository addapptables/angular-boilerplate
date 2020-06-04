import { NgModule, APP_INITIALIZER, Injector, ModuleWithProviders } from '@angular/core';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { appInitializerFactory } from './app-initializer-factory';
import { CONFIGURATION_BOILERPLATE, IS_PRODUCTION } from './tokens';
import { BoilerplateModel } from './models/boilerplate.model';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CraftsjsHttpInterceptor } from './services/interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponseService } from './services/http-error-response.service';
import { SessionService } from './services/session.service';
import { L10nTranslationModule } from 'angular-l10n';

@NgModule({
  providers: [
    AuthService
  ]
})
export class BoilerplateModule {

  static forRoot(boilerplateModel: BoilerplateModel = { isProduction: false }): ModuleWithProviders {
    return {
      ngModule: BoilerplateModule,
      providers: [
        InitialConfigurationService,
        TokenService,
        CookieService,
        HttpErrorResponseService,
        SessionService,
        L10nTranslationModule,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CraftsjsHttpInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [Injector],
          multi: true
        },
        {
          provide: CONFIGURATION_BOILERPLATE,
          useFactory: initialConfiguration,
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

export function initialConfiguration(initialConfigurationService: InitialConfigurationService) {
  return initialConfigurationService.configuration;
}
