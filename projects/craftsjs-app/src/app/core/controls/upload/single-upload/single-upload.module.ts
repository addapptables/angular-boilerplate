import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SingleUploadComponent } from './single-upload.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [SingleUploadComponent],
  imports: [
    SharedModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    SingleUploadComponent
  ]
})
export class SingleUploadModule { }
