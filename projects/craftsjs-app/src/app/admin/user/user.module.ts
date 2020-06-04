import { NgModule } from '@angular/core';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserStore } from '@redux/user/stores/user.store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@redux/user/effects/user.effects';
import { UserListSearchComponent } from './components/user-list/user-list-search/user-list-search.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { UserActionService } from './services/user-action.service';
import { SharedModule } from '../../shared/shared.module';
import { SharedModalModule } from '../../shared/shared-modal-module.module';
import { SharedFormsModule } from '../../shared/shared-forms-module.module';
import { SharedTablesModule } from '../../shared/shared-tables-module.module';
import { RoleSelectModule } from '../../core/controls/selects/role-select/role-select.module';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserListComponent,
    UserListSearchComponent,
    UserFormComponent,
    UserFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    UserRoutingModule,
    MatTooltipModule,
    MatCheckboxModule,
    RoleSelectModule,
    ReduxRegisterModule.forFeature('user', { store: UserStore }),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserActionService
  ],
  exports: [UserListComponent]
})
export class UserModule { }
