import { Store, Action } from '@craftsjs/ngrx-action';
import { MenuStoreModel } from '../models/menu-store.model';
import * as MenuActions from '../actions/menu.actions';


@Store<MenuStoreModel>({
    loading: false,
    menus: []
})
export class MenuStore {

    @Action(MenuActions.loadMenus)
    loadMenu(state: MenuStoreModel) {
        return { ...state, loading: true };
    }

    @Action(MenuActions.menusLoaded)
    menusLoaded(state: MenuStoreModel, { payload: { menus } }) {
        return { ...state, loading: false, menus };
    }
}
