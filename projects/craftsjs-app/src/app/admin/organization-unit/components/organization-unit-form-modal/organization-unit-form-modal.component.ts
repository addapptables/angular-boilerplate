import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';

@Component({
  selector: 'app-organization-unit-form-modal',
  templateUrl: './organization-unit-form-modal.component.html',
  styleUrls: ['./organization-unit-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<OrganizationUnitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public organizationUnitDto: OrganizationUnitDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
