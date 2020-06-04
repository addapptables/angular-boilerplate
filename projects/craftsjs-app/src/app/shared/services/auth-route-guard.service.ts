import { Injectable } from '@angular/core';

import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot
} from '@angular/router';
import { menus } from '@redux/menu/services/data';
import { MenuModel } from '@craftsjs/menu-admin';
import * as _ from 'lodash';
import { SessionService } from '@craftsjs/boilerplate';

@Injectable()
export class AppRouteGuard implements CanActivateChild {

  constructor(
    private _router: Router,
    private _sessionService: SessionService,
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    if (_.isEmpty(this._sessionService.user)) {
      this._router.navigate(['/']);
      return false;
    }
    if (!route.data || !route.data.permission) {
      return true;
    }
    if (!this._isGranted(route.data.permission)) {
      this._router.navigate([this._selectBestMenu()]);
    }
    return true;
  }

  private _isGranted(page: string) {
    return this._sessionService.user.permissions.find(x => x === page) !== undefined;
  }

  private _selectBestMenu() {
    const permissions = this._sessionService.user.permissions;
    const menu = this._filterMenu(menus, permissions);
    const allUrl = this._selectMenuWithUrl(menu);
    if (allUrl.length > 0) {
      return allUrl[0];
    }
    return '/admin/user-profile';
  }

  private _selectMenuWithUrl(menu: MenuModel[]) {
    const allMenuWithUrl = menu.filter(x => x.url);
    const newUrl = [...allMenuWithUrl.map(x => x.url)];
    const allMenuWithChildren = menu.filter(x => x.children && x.children.length > 0);
    const allurl = allMenuWithChildren.map(x => this._selectMenuWithUrl(x.children));
    const urls = allurl.reduce((a, b) => (a = a.concat(b), a), []);
    return [...newUrl, ...urls];
  }

  private _filterMenu(menu: MenuModel[], allPermissions: string[]) {
    return menu
      .filter(x => allPermissions.find(y => y === x.permission))
      .map(x => ({
        ...x,
        children: x.multiOption && this._filterMenu(x.children, allPermissions)
      } as MenuModel));
  }
}
