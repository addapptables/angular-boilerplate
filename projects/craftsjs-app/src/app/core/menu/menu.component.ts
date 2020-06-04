import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MenuModel, MenuHeaderModel, MenuUserModel } from '@craftsjs/menu-admin';
import * as MenuActions from '@redux/menu/actions/menu.actions';
import { selectAllMenus } from '@redux/menu/selectors/menu.selector';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { MenuModelTenant } from '@redux/menu/services/data';
import { SessionService, TenantDto } from '@craftsjs/boilerplate';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

    menus$: Observable<MenuModel[]>;

    header$: Observable<MenuHeaderModel>;

    user$: Observable<MenuUserModel>;

    constructor(
        private readonly _store: Store,
        private _appSessionService: SessionService
    ) {
        _store.dispatch(MenuActions.loadMenus());
    }

    ngOnInit() {
        const menus$ = this._store.pipe(
            select(selectAllMenus),
        );
        const user$ = this._appSessionService.userObservable;
        const tenant$ = this._appSessionService.tenantObservable;
        this.menus$ = combineLatest([menus$, user$, tenant$]).pipe(
            map(([menus, user, tenant]) => {
                const permissions = user !== undefined ? user.permissions : [];
                return this._filterMenu(menus, permissions, tenant);
            })
        );
        this._initUser();
        this._initHeader();
    }

    private _filterMenu(menus: MenuModelTenant[], allPermissions: string[], tenant: TenantDto) {
        return menus
            .filter(x => allPermissions.find(y => y === x.permission))
            .filter(x => {
                if (_.isEmpty(tenant)) {
                    return x.viewTenant === true;
                }
                return true;
            })
            .map(x => ({
                ...x,
                children: x.multiOption && this._filterMenu(x.children, allPermissions, tenant)
            } as MenuModelTenant));
    }

    private _initUser() {
        const firstAndUpperCase = (name: string) => name.charAt(0).toUpperCase();
        const upperCaseFirstLetter = (name: string) => firstAndUpperCase(name) + name.slice(1).toLowerCase();
        this.user$ = this._appSessionService.userObservable.pipe(
            map((user) => {
                if (!_.isEmpty(user) && user != null) {
                    return {
                        avatarUrl: 'assets/images/profile/default-profile-picture.png',
                        initialName: firstAndUpperCase(user.name) + firstAndUpperCase(user.surname),
                        fullName: `${upperCaseFirstLetter(user.name)} ${upperCaseFirstLetter(user.surname)}`,
                        email: user.emailAddress
                    };
                }
                return {} as MenuUserModel;
            })
        );
    }

    private _initHeader() {
        this.header$ = this._appSessionService.tenantObservable.pipe(
            map(tenant => {
                if (!_.isEmpty(tenant) && tenant !== null) {
                    return {
                        companyName: tenant.name.toUpperCase(),
                        logoUrl: 'assets/images/logo/addaptables.svg'
                    };
                }
                return {
                    companyName: 'CRAFTSJS',
                    logoUrl: 'assets/images/logo/addaptables.svg'
                };
            })
        );
    }
}
