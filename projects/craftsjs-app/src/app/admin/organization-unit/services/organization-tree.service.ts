import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { Store, select } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';
import { OrganizationUnitTreeModel } from '../models/organization-unit-tree.model';
import { selectAllOrganizationUnits, selectOrganizationUnitLoading } from '@redux/organization-unit/selectors/organization-unit.selector';
import { takeUntil, tap, map } from 'rxjs/operators';
import * as OrganizationActions from '@redux/organization-unit/actions/organization-unit.actions';

@Injectable()
export class OrganizationUnitTreeService extends DataSource<OrganizationUnitTreeModel> {

  private _unsubscribeAll: Subject<OrganizationUnitDto[]> = new Subject();

  organizationUnits$: Observable<OrganizationUnitDto[]>;

  loading$: Observable<boolean>;

  constructor(private _store: Store) {
    super();
    this.initialize();
  }

  initialize() {
    this.organizationUnits$ = this._store.pipe(
      select(selectAllOrganizationUnits)
    );
    this.loading$ = this._store.pipe(
      select(selectOrganizationUnitLoading)
    );
  }

  connect(): Observable<OrganizationUnitTreeModel[]> {
    return this._getDataSourceOrganizationUnits().pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  disconnect(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._store.dispatch(OrganizationActions.cancelOrganizationUnitRequest());
  }

  private _getDataSourceOrganizationUnits() {
    return this.organizationUnits$.pipe(
      tap((organizationUnits) => {
        if (organizationUnits.length === 0) {
          this._store.dispatch(OrganizationActions.loadOrganizationUnits({ filter: { skip: 0, take: 1000 } }));
        }
      }),
      map((organizationUnits) => this._buildOrganizationUnitTree(organizationUnits.filter(x => x.parentId !== undefined)))
    );
  }

  private _buildOrganizationUnitTree(organizationUnits: OrganizationUnitDto[]): OrganizationUnitTreeModel[] {
    return organizationUnits
      .filter(x => !x.parentId)
      .map(x => ({
        id: x.id,
        name: x.name,
        hasParent: false,
        level: 0,
        parentId: undefined,
        children: this._buildChildren(organizationUnits, x.id, 1)
      } as OrganizationUnitTreeModel));
  }

  private _buildChildren(organizationUnits: OrganizationUnitDto[], parentId: string, level: number): OrganizationUnitTreeModel[] {
    return organizationUnits.filter(x => x.parentId === parentId).map(x => ({
      id: x.id,
      name: x.name,
      hasParent: true,
      level,
      parentId,
      children: this._buildChildren(organizationUnits, x.id, level + 1)
    } as OrganizationUnitTreeModel));
  }
}
