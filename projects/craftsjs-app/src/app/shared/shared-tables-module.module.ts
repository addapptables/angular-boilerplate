import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class SharedTablesModule { }
