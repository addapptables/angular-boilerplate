import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, ViewChild } from '@angular/core';
import { OrganizationUnitService } from '@redux/organization-unit/services/organization-unit.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationUnitRoleDto } from '@redux/organization-unit/models/roles/organization-unit-role.dto';
import { MatPaginator } from '@angular/material/paginator';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { ModalService } from '@craftsjs/modal';
import { RoleOrganizationUnitFormModalComponent } from '../role-organization-unit-form-modal/role-organization-unit-form-modal.component';
import { AlertService } from '@craftsjs/alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-role-organization-unit-list',
  templateUrl: './role-organization-unit-list.component.html',
  styleUrls: ['./role-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleOrganizationUnitListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['actions', 'name'];

  dataSource: MatTableDataSource<OrganizationUnitRoleDto>;

  organizationUnitId: string;

  size = 5;

  unsubscribeAll = new Subject();

  loading = new BehaviorSubject(false);

  loading$ = this.loading.asObservable();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input()
  set setOrganizationUnitId(organizationUnitId: string) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.paginator && this.paginator.firstPage();
      this.loadDataSource();
    }
  }

  constructor(
    private _organizationUnitService: OrganizationUnitService,
    private _modalService: ModalService,
    private _alertService: AlertService,
    private _translateService: TranslateService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.organizationUnitId) {
      this.loadDataSource();
    }
  }

  associateRoles() {
    const dialog = this._modalService.show(RoleOrganizationUnitFormModalComponent, this.organizationUnitId);
    dialog.afterClosed().pipe(
      takeUntil(this.unsubscribeAll),
      tap((result) => result && this.loadDataSource())
    ).subscribe();
  }

  delete({ id, name }: OrganizationUnitRoleDto) {
    const title = this._translateService.instant('general.delete');
    const message = this._translateService.instant('organizationUnit.areYouSureDeleteRole', { title: name });
    const dialog = this._alertService.showConfirmation(title, message);
    dialog.beforeClosed().pipe(
      takeUntil(this.unsubscribeAll),
    ).subscribe((decision) => {
      if (decision && decision.result === 'ok') {
        this._organizationUnitService.deleteRole(id).pipe(
          takeUntil(this.unsubscribeAll),
          tap(() => this.loadDataSource())
        ).subscribe();
      }
    });
  }

  loadDataSource() {
    this.loading.next(true);
    this.destroy();
    this.unsubscribeAll = new Subject();
    this._organizationUnitService
      .getRolesAssociateToOrganizationUnit(this.organizationUnitId)
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => this.loading.next(false)),
        tap((data) => {
          this.dataSource.data = data;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
