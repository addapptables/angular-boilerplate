import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as PermissionActions from '@redux/permission/actions/permission.actions';
import { PermissionTreeModel } from '../models/permission-tree.model';
import { PermissionDto } from '@redux/permission/models/permission-dto.model';
import { selectAllPermissions } from '@redux/permission/selectors/permission.selector';
import { map, tap, takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

@Injectable()
export class PermissionTreeService extends DataSource<PermissionTreeModel> {

  private _unsubscribeAll: Subject<PermissionDto[]> = new Subject();

  permissions$: Observable<PermissionDto[]>;

  constructor(private _store: Store) {
    super();
    this.initialize();
  }

  initialize() {
    this.permissions$ = this._store.pipe(
      select(selectAllPermissions)
    );
  }

  connect(): Observable<PermissionTreeModel[]> {
    return this._getDataSourcePermission().pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  disconnect(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._store.dispatch(PermissionActions.cancelLoadPermissions());
  }

  private _getDataSourcePermission() {
    return this.permissions$.pipe(
      tap((permissions) => {
        if (permissions.length === 0) {
          this._store.dispatch(PermissionActions.loadPermissions());
        }
      }),
      map((permissions) => this._buildPermissionTree(permissions))
    );
  }

  private _buildPermissionTree(permissions: PermissionDto[]): PermissionTreeModel[] {
    return permissions
      .filter(x => !x.parentId)
      .map(x => ({
        id: x.id,
        name: x.name,
        hasParent: false,
        level: 0,
        parentId: undefined,
        children: this._buildChildren(permissions, x.id, 1)
      } as PermissionTreeModel));
  }

  private _buildChildren(permissions: PermissionDto[], parentId: string, level: number): PermissionTreeModel[] {
    return permissions.filter(x => x.parentId === parentId).map(x => ({
      level,
      parentId,
      id: x.id,
      name: x.name,
      hasParent: true,
      children: this._buildChildren(permissions, x.id, level + 1)
    } as PermissionTreeModel));
  }
}
