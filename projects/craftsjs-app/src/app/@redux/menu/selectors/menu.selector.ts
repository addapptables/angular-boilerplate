import { MenuStoreModel } from '../models/menu-store.model';
import { createSelector } from '@ngrx/store';


export const selectMenuState = state => state.menu.sidebar as MenuStoreModel;

export const selectAllMenus = createSelector(
    selectMenuState,
    sidebar => sidebar.menus
);
