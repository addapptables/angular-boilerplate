import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditionDto } from '@redux/edition/models/edition-dto.model';

@Component({
  selector: 'app-edition-form-modal',
  templateUrl: './edition-form-modal.component.html',
  styleUrls: ['./edition-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<EditionFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editionDto: EditionDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
