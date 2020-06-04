import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil, tap, finalize } from 'rxjs/operators';
import { CustomSelectionModel } from '../../../../../../shared/list/custom-selection-model';
import { AssociationRoleToOrganizationUnitSelect } from '../../../../models/association-role-to-organization-unit-select.model';
import { MatTableDataSource } from '@angular/material/table';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, BehaviorSubject } from 'rxjs';
import { OrganizationUnitService } from '@redux/organization-unit/services/organization-unit.service';

@Component({
  selector: 'app-associate-role-organization-unit-list',
  templateUrl: './associate-role-organization-unit-list.component.html',
  styleUrls: ['./associate-role-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssociateRoleOrganizationUnitListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['actions', 'name'];

  organizationUnitId: string;

  selection = new CustomSelectionModel<AssociationRoleToOrganizationUnitSelect>(true, []);

  size = 5;

  dataSource: MatTableDataSource<RoleDto>;

  unsubscribeAll = new Subject();

  unsubscribeSelectionChange = new Subject();

  loading = new BehaviorSubject(false);

  loading$ = this.loading.asObservable();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Output()
  rolesSelected = new EventEmitter<AssociationRoleToOrganizationUnitSelect[]>();

  @Input()
  set setOrganizationUnitId(organizationUnitId: string) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.paginator && this.paginator.firstPage();
      this.loadDataSource();
    }
  }

  constructor(private _organizationUnitService: OrganizationUnitService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.selection.changed.pipe(
      takeUntil(this.unsubscribeSelectionChange),
      tap((result) => this.rolesSelected.emit(result.allSelection))
    ).subscribe();
  }

  loadDataSource() {
    this.loading.next(true);
    this.destroy();
    this.unsubscribeAll = new Subject();
    this._organizationUnitService
      .getRoles(this.organizationUnitId)
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => this.loading.next(false)),
        tap((data) => {
          this.dataSource.data = data;
        })
      ).subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.filter(x => x.pageIndex === this.paginator.pageIndex).length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selection.select(...this.dataSource.data.map(row => ({ id: row.id, pageIndex: this.paginator.pageIndex })));
  }

  ngOnDestroy(): void {
    this.destroy();
    this.unsubscribeSelectionChange.next();
    this.unsubscribeSelectionChange.complete();
  }

  destroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
