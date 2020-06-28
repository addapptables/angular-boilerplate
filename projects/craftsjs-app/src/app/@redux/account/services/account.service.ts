import { Injectable, Injector } from '@angular/core';
import { ImpersonateInput } from '../models/impersonate-input.model';
import { ImpersonateOutput } from '../models/impersonate-output.model';
import { ServiceApiBase } from '../../shared/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ServiceApiBase {

  constructor(
    injector: Injector
  ) {
    super(injector, 'api/auth/account');
  }

  impersonate(impersonateInput: ImpersonateInput) {
    return this.post<ImpersonateInput, ImpersonateOutput>('impersonate', impersonateInput);
  }

  backToImpersonator() {
    return this.post<ImpersonateOutput>('back-to-impersonator');
  }
}
