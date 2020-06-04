import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MenuActions from '../actions/menu.actions';
import { MenuService } from '../services/menu.service';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class MenuEffects {

  constructor(private _actions$: Actions, private _menuService: MenuService) { }

  loadMenus$ = createEffect(() => this._actions$.pipe(
    ofType(MenuActions.loadMenus),
    switchMap(() => this._menuService.getAllMenus()),
    map(menus => MenuActions.menusLoaded({ payload: { menus } }))
  ));
}
