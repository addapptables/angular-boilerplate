import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';

@Component({
  selector: 'app-tenant-form-modal',
  templateUrl: './tenant-form-modal.component.html',
  styleUrls: ['./tenant-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<TenantFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tenantDto: TenantDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
