import { MenuModel } from '@craftsjs/menu-admin';

export interface MenuStoreModel {
    menus: MenuModel[];
    loading: boolean;
}
