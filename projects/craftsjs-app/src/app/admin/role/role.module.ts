import { NgModule } from '@angular/core';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { RoleRoutingModule } from './role-routing.module';
import { RoleLayoutComponent } from './component/role-layout/role-layout.component';
import { RoleListComponent } from './component/role-list/role-list.component';
import { EffectsModule } from '@ngrx/effects';
import { RoleStore } from '@redux/role/stores/role.store';
import { RoleEffects } from '@redux/role/effects/role.effects';
import { RoleFormComponent } from './component/role-form/role-form.component';
import { RoleFormModalComponent } from './component/role-form-modal/role-form-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../../shared/shared.module';
import { SharedModalModule } from '../../shared/shared-modal-module.module';
import { SharedFormsModule } from '../../shared/shared-forms-module.module';
import { SharedTablesModule } from '../../shared/shared-tables-module.module';
import { PermissionTreeModule } from '../../core/controls/tree/permission-tree/permission-tree.module';

@NgModule({
  declarations: [
    RoleLayoutComponent,
    RoleListComponent,
    RoleFormComponent,
    RoleFormModalComponent
  ],
  imports: [
    SharedModule,
    RoleRoutingModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    PermissionTreeModule,
    MatStepperModule,
    ReduxRegisterModule.forFeature('role', { store: RoleStore }),
    EffectsModule.forFeature([RoleEffects])
  ]
})
export class RoleModule { }
