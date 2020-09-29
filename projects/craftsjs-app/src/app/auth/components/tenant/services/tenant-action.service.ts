import { Injectable } from '@angular/core';
import { NotifierService, NotifierType } from '@craftsjs/notifier';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { TenantService } from '@redux/tenant/services/tenant.service';
import { GetTenantDto } from '@redux/tenant/models/get-tenant-dto.model';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';

@Injectable()
export class TenantActionService {

  constructor(
    private _notifierService: NotifierService,
    private _translateService: TranslateService,
    private _utilsService: CookieService,
    private _tenantService: TenantService
  ) { }

  isTenantAvailable(input: GetTenantDto) {
    return this._tenantService.isTenantAvailable(input);
  }

  changeTenant(tenant: TenantDto, tenancyName: string): boolean {
    if (_.isEmpty(tenant)) {
      this.notifierWarning(this._translateService.instant('tenant.tenantIsNotActive', { x: tenancyName }));
      this.setTenantCookie(undefined);
      return false;
    }
    this.setTenantCookie(tenant.id);
    return true;
  }

  private notifierWarning(message: string) {
    this._notifierService.open({
      message,
      type: NotifierType.warning
    });
  }

  setTenantCookie(tenantId: string) {
    if (!_.isEmpty(tenantId)) {
      this._utilsService.set('craftsjs-tenantId', tenantId, new Date(new Date().getTime() + 5 * 365 * 86400000), '/', undefined, false, 'Lax');
    } else {
      this._utilsService.delete('craftsjs-tenantId', '/', undefined, false, 'Lax');
    }
  }
}
