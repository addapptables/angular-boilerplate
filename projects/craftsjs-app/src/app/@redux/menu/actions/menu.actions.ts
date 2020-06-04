import { createAction, props } from '@ngrx/store';
import { MenuModel } from '@craftsjs/menu-admin';

export enum MenuActionTypes {
  LoadMenus = '[Menu] Load Menus',
  MenusLoaded = '[Menu] Menus loaded'
}

export const loadMenus = createAction(MenuActionTypes.LoadMenus);

export const menusLoaded = createAction(MenuActionTypes.MenusLoaded, props<{ payload: { menus: MenuModel[] } }>());
