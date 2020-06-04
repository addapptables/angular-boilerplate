import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetUserDto } from '@redux/user/models/get-user-dto.model';

@Component({
  selector: 'app-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListSearchComponent implements OnInit {

  form: FormGroup;

  @Output()
  search = new EventEmitter<GetUserDto>();

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      keyword: [null],
      isActive: [true],
      roleId: [null]
    });
  }

  submit() {
    this.search.emit(this.form.value);
  }

  clear() {
    this.form.reset({ isActive: true });
    this.search.emit(this.form.value);
  }
}
