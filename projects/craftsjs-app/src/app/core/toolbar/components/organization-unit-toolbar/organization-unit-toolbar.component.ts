import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { Store, select } from '@ngrx/store';
import { SessionService } from '@craftsjs/boilerplate';
import { takeUntil, tap } from 'rxjs/operators';
import * as RoleOrganizationUnitActions from '@redux/organization-unit/actions/role-organization-unit.actions';
import { selectAllRoleOrganizationUnits, selectRoleOrganizationUnit } from '@redux/organization-unit/selectors/role-organization-unit.selector';
import { UserService } from '@redux/user/services/user.service';

@Component({
  selector: 'app-organization-unit-toolbar',
  templateUrl: './organization-unit-toolbar.component.html',
  styleUrls: ['./organization-unit-toolbar.component.scss']
})
export class OrganizationUnitToolbarComponent implements OnInit, OnDestroy {

  selectOrganizationUnit$: Observable<OrganizationUnitDto>;

  organizationUnits$: Observable<OrganizationUnitDto[]>;

  _unsubscribeAll = new Subject();

  _unsubscribeUser = new Subject();

  constructor(
    readonly _store: Store,
    readonly _session: SessionService,
    readonly _userService: UserService
  ) { }

  ngOnInit() {
    this._session.userObservable.pipe(
      takeUntil(this._unsubscribeUser),
      tap((result) => {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._unsubscribeAll = new Subject();
        if (result) {
          this._store.dispatch(RoleOrganizationUnitActions.roleOrganizationUnitClearStore());
          this.loadOrganizationUnits(result.lastOrganizationUnitId);
        }
      })
    ).subscribe();
    this.selectOrganizationUnit$ = this._store.pipe(
      select(selectRoleOrganizationUnit)
    );
  }

  loadOrganizationUnits(lastOrganizationUnitId?: string) {
    this.organizationUnits$ = this._store.pipe(
      select(selectAllRoleOrganizationUnits),
      takeUntil(this._unsubscribeAll)
    ).pipe(
      tap((data) => {
        if (data.length === 0) {
          this._store.dispatch(RoleOrganizationUnitActions.loadRoleOrganizationUnits());
          this._store.dispatch(RoleOrganizationUnitActions.selectRoleOrganizationUnit({ organizationUnit: undefined }));
        } else {
          if (!lastOrganizationUnitId) {
            this.changeOrganizationUnit(data[0]);
          } else {
            const organizationUnit = data.find(x => x.id === lastOrganizationUnitId);
            if (organizationUnit) {
              this._store.dispatch(RoleOrganizationUnitActions.selectRoleOrganizationUnit({ organizationUnit }));
            } else {
              this.changeOrganizationUnit(data[0]);
            }
          }
        }
      })
    );
  }

  changeOrganizationUnit(organizationUnit: OrganizationUnitDto) {
    this.updateOrganizationUnitUser(organizationUnit.id);
    this._store.dispatch(RoleOrganizationUnitActions.selectRoleOrganizationUnit({ organizationUnit }));
  }

  updateOrganizationUnitUser(id: string) {
    this._userService.changeOrganizationUnit(id)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => {
          this._session.init().pipe(
            takeUntil(this._unsubscribeAll)
          )
            .subscribe();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._store.dispatch(RoleOrganizationUnitActions.roleOrganizationUnitClearStore());
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._unsubscribeUser.next();
    this._unsubscribeUser.complete()
  }
}
