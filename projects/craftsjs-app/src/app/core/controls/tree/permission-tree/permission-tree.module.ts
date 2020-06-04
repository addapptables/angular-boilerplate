import { NgModule } from '@angular/core';
import { PermissionTreeComponent } from './permission-tree.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { PermissionStore } from '@redux/permission/stores/permission.store';
import { PermissionEffects } from '@redux/permission/effects/permission.effects';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [PermissionTreeComponent],
  imports: [
    SharedModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    ReduxRegisterModule.forFeature('permissions', { store: PermissionStore }),
    EffectsModule.forFeature([PermissionEffects]),
  ],
  exports: [PermissionTreeComponent]
})
export class PermissionTreeModule { }
