import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from '@craftsjs/modal';

@NgModule({
  exports: [
    MatDialogModule,
    ModalModule,
  ]
})
export class SharedModalModule { }
