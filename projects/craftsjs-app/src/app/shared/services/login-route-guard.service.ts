import { Injectable } from '@angular/core';

import {
  Router,
  CanActivate
} from '@angular/router';
import * as _ from 'lodash';
import { SessionService } from '@craftsjs/boilerplate';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _sessionService: SessionService,
  ) { }

  canActivate(): boolean {
    if (!_.isEmpty(this._sessionService.user)) {
      this._router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
