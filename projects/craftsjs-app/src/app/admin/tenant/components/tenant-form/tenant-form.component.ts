import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { FormGroup, Validators } from '@angular/forms';
import { selectTenantLoadingAction, selectTenantActionState } from '@redux/tenant/selectors/tenant.selector';
import * as TenantActions from '@redux/tenant/actions/tenant.actions';
import { maxLengthLargeSize } from '@redux/user/user.const';
import { FormBase } from '../../../../shared/forms/form-base';
import { UtilValidation } from '../../../../shared/utils/util-validation';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent extends FormBase implements OnInit {

  maxNameLength = 128;

  maxTenancyNameLength = 64;

  maxEmailAddressLength = maxLengthLargeSize;

  maxConnectionStringLength = 1024;

  formGroup: FormGroup;

  @Input()
  tenantDto: TenantDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectTenantLoadingAction, selectTenantActionState, TenantActions.tenantActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.tenantDto.id],
      name: [this.tenantDto.name, [UtilValidation.required, Validators.maxLength(this.maxNameLength)]],
      subDomain: [
        this.tenantDto.subDomain,
        [
          UtilValidation.required,
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]{1,}$'),
          Validators.maxLength(this.maxTenancyNameLength)
        ]
      ],
      editionId: [this.tenantDto.editionId],
      isActive: [this.tenantDto.isActive]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const tenantDto = this.formGroup.value;
    if (tenantDto.id) {
      this._store.dispatch(TenantActions.updateTenant({ tenant: tenantDto }));
    } else {
      this._store.dispatch(TenantActions.createTenant({ tenant: tenantDto }));
    }
  }

}
