import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotifierModule } from '@craftsjs/notifier';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { SharedFormsModule } from '../shared/shared-forms-module.module';
import { SharedModalModule } from '../shared/shared-modal-module.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginRouteGuard } from '../shared/services/login-route-guard.service';
import { ProgressBarModule } from '../core/shared/progress-bar/progress-bar.module';
import { LanguageModule } from '../core/shared/select-language/select-language.module';
import { TenantFormModalComponent } from './components/tenant/tenant-form-modal/tenant-form-modal.component';
import { TenantFormComponent } from './components/tenant/tenant-form/tenant-form.component';
import { TenantActionService } from './components/tenant/services/tenant-action.service';

@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    TenantFormModalComponent,
    TenantFormComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    SharedFormsModule,
    SharedModalModule,
    NotifierModule,
    MatCheckboxModule,
    AuthRoutingModule,
    ProgressBarModule,
    LanguageModule
  ],
  providers: [
    LoginRouteGuard,
    TenantActionService
  ]
})
export class AuthModule { }
