import { NgModule } from '@angular/core';
import { EditionSelectComponent } from './edition-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { EditionStore } from '@redux/edition/stores/edition.store';
import { EditionEffects } from '@redux/edition/effects/edition.effects';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [EditionSelectComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ReduxRegisterModule.forFeature('edition', { store: EditionStore }),
    EffectsModule.forFeature([EditionEffects])
  ],
  exports: [EditionSelectComponent]
})
export class EditionSelectModule { }
