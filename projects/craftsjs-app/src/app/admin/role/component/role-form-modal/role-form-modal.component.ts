import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleDto } from '@redux/role/models/role-dto.model';

@Component({
  selector: 'app-role-form-modal',
  templateUrl: './role-form-modal.component.html',
  styleUrls: ['./role-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<RoleFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public roleDto: RoleDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
