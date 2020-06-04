import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role-organization-unit-form-modal',
  templateUrl: './role-organization-unit-form-modal.component.html',
  styleUrls: ['./role-organization-unit-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleOrganizationUnitFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<RoleOrganizationUnitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public organizationUnitId: string
  ) { }

  save() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close();
  }
}
