import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EditionStore } from '@redux/edition/stores/edition.store';
import { EditionEffects } from '@redux/edition/effects/edition.effects';
import { EditionRoutingModule } from './edition-routing.module';
import { EditionLayoutComponent } from './components/edition-layout/edition-layout.component';
import { EditionActionService } from './services/edition-action.service';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { EditionFormComponent } from './components/edition-form/edition-form.component';
import { EditionFormModalComponent } from './components/edition-form-modal/edition-form-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedFormsModule } from '../../shared/shared-forms-module.module';
import { SharedModalModule } from '../../shared/shared-modal-module.module';
import { SharedTablesModule } from '../../shared/shared-tables-module.module';
import { EditionTypePaySelectModule } from '../../core/controls/selects/edition-type-pay-select/edition-type-pay-select.module';

@NgModule({
  declarations: [
    EditionLayoutComponent,
    EditionListComponent,
    EditionFormComponent,
    EditionFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    SharedModalModule,
    SharedTablesModule,
    MatCheckboxModule,
    EditionRoutingModule,
    EditionTypePaySelectModule,
    ReduxRegisterModule.forFeature('edition', { store: EditionStore }),
    EffectsModule.forFeature([EditionEffects])
  ],
  providers: [
    EditionActionService
  ]
})
export class EditionModule { }
