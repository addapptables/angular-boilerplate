import { NgModule } from '@angular/core';
import { EditionTypePaySelectComponent } from './edition-type-pay-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [EditionTypePaySelectComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [EditionTypePaySelectComponent]
})
export class EditionTypePaySelectModule { }
