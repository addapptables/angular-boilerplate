import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetTenantDto } from '@redux/tenant/models/get-tenant-dto.model';

@Component({
  selector: 'app-tenant-list-search',
  templateUrl: './tenant-list-search.component.html',
  styleUrls: ['./tenant-list-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantListSearchComponent implements OnInit {

  form: FormGroup;

  @Output()
  search = new EventEmitter<GetTenantDto>();

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      keyword: [null],
      editionId: [null],
      isActive: [true]
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
