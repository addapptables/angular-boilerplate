import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { menus } from './data';
import { MenuModel } from '@craftsjs/menu-admin';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getAllMenus(): Observable<MenuModel[]> {
    return of(menus);
  }

}
