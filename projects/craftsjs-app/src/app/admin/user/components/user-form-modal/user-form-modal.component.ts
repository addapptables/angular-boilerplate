import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from '@redux/user/models/user-dto.model';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<UserFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
