import { NgModule } from '@angular/core';
import { RoleSelectComponent } from './role-select.component';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'projects/craftsjs-app/src/app/shared/shared.module';
import { RoleStore } from '@redux/role/stores/role.store';
import { RoleEffects } from '@redux/role/effects/role.effects';

@NgModule({
  declarations: [
    RoleSelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReduxRegisterModule.forFeature('role', { store: RoleStore }),
    EffectsModule.forFeature([RoleEffects])
  ],
  exports: [RoleSelectComponent]
})
export class RoleSelectModule { }
