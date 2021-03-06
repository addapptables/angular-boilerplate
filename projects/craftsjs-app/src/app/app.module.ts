import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
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
import { createTranslateLoader } from './localization/i18n.localization';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
