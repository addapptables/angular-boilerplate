import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantFormComponent } from '../tenant-form/tenant-form.component';

@Component({
  selector: 'app-tenant-form-modal',
  templateUrl: './tenant-form-modal.component.html',
  styleUrls: ['./tenant-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<TenantFormComponent>
  ) { }

  close() {
    this._dialogRef.close();
  }

}
