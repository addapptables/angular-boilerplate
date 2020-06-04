import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { TenantDto, SessionService, CONFIGURATION_BOILERPLATE, ConfigurationModel } from '@craftsjs/boilerplate';
import { ModalService } from '@craftsjs/modal';
import { Observable } from 'rxjs';
import { TenantFormModalComponent } from '../tenant/tenant-form-modal/tenant-form-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  tenant$: Observable<TenantDto>;

  enabledTenancy = false;

  constructor(
    private _sessionService: SessionService,
    @Inject(CONFIGURATION_BOILERPLATE) private _configuration: ConfigurationModel,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.tenant$ = this._sessionService.tenantObservable;
    this.enabledTenancy = this._configuration.enabledTenancy;
  }

  showTenantChange(): boolean {
    return !this._configuration.enabledTenancy;
  }

  openModalTenant() {
    this._modalService.show(TenantFormModalComponent);
  }

}
