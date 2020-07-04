import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { BoilerplateModule } from '@craftsjs/boilerplate';
import { CoreModule } from '@craftsjs/core';
import { NotifierModule } from '@craftsjs/notifier';
import { AlertModule } from '@craftsjs/alert';
import { ModalModule } from '@craftsjs/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from '../reducers';
import { environment } from '../environments/environment';
import { CraftsRouterSerializer } from '../reducers/router-serializer.shared';
import { AuthModule } from './auth/auth.module';
import { HttpTranslationLoader, l10nConfig, initL10n } from './localization/i18n.localization';
import { L10nTranslationModule, L10nLoader } from 'angular-l10n';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    L10nTranslationModule.forRoot(
      l10nConfig,
      {
        translationLoader: HttpTranslationLoader
      }
    ),
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    BoilerplateModule.forRoot({ isProduction: environment.production }),
    CoreModule,
    AuthModule,
    AlertModule.forRoot(),
    NotifierModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: RouterStateSerializer, useClass: CraftsRouterSerializer
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
