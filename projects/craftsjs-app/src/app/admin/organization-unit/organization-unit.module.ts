import { NgModule } from '@angular/core';
import { OrganizationUnitRoutingModule } from './organization-unit-routing.module';
import { OrganizationUnitLayoutComponent } from './components/organization-unit-layout/organization-unit-layout.component';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationUnitStore } from '@redux/organization-unit/stores/organization-unit.store';
import { OrganizationUnitEffects } from '@redux/organization-unit/effects/organization-unit.effects';
import { OrganizationUnitTreeComponent } from './components/organization-unit-tree/organization-unit-tree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { OrganizationUnitFormComponent } from './components/organization-unit-form/organization-unit-form.component';
import { OrganizationUnitFormModalComponent } from './components/organization-unit-form-modal/organization-unit-form-modal.component';
import { OrganizationUnitActionService } from './services/organization-unit-action.service';
import { SharedModule } from '../../shared/shared.module';
import { SharedModalModule } from '../../shared/shared-modal-module.module';
import { SharedFormsModule } from '../../shared/shared-forms-module.module';
import { SharedTablesModule } from '../../shared/shared-tables-module.module';
import { RoleOrganizationUnitListComponent } from './components/associations/roles/role-organization-unit-list/role-organization-unit-list.component';
import { OrganizationUnitAssociationLayoutComponent } from './components/associations/organization-unit-association-layout/organization-unit-association-layout.component';
import { RoleOrganizationUnitFormModalComponent } from './components/associations/roles/role-organization-unit-form-modal/role-organization-unit-form-modal.component';
import { RoleOrganizationUnitFormComponent } from './components/associations/roles/role-organization-unit-form/role-organization-unit-form.component';
import { AssociateRoleOrganizationUnitListComponent } from './components/associations/roles/associate-role-organization-unit-list/associate-role-organization-unit-list.component';

@NgModule({
  declarations: [
    OrganizationUnitLayoutComponent,
    OrganizationUnitTreeComponent,
    OrganizationUnitFormComponent,
    OrganizationUnitFormModalComponent,
    RoleOrganizationUnitListComponent,
    OrganizationUnitAssociationLayoutComponent,
    RoleOrganizationUnitFormModalComponent,
    RoleOrganizationUnitFormComponent,
    AssociateRoleOrganizationUnitListComponent
  ],
  imports: [
    SharedModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    OrganizationUnitRoutingModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule,
    ReduxRegisterModule.forFeature('organizationUnit', { store: OrganizationUnitStore }),
    EffectsModule.forFeature([
      OrganizationUnitEffects,
    ])
  ],
  providers: [OrganizationUnitActionService]
})
export class OrganizationUnitModule { }
