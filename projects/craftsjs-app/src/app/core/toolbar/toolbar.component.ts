import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SessionService, TenantDto, AuthService } from '@craftsjs/boilerplate';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as profileActions from '@redux/profile/actions/profile.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isImpersonatedLogin$: Observable<boolean>;

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  tenant$: Observable<TenantDto>;

  unsubscribeAll = new Subject();

  constructor(
    private _sessionService: SessionService,
    private _authService: AuthService,
    private _store: Store,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.tenant$ = this._sessionService.tenantObservable;
    this.isImpersonatedLogin$ = this._sessionService.loginInformationObservable.pipe(
      map((result) => result.impersonatorUserId != undefined)
    );
  }

  backToMyAccount() {
    this.saveSubject.next(true);
    this._authService.backToImpersonatedAuthenticate().pipe(
      takeUntil(this.unsubscribeAll),
    ).subscribe(() => {
      this._store.dispatch(profileActions.profileClearStore());
      this.saveSubject.next(false);
      this._router.navigate(['admin/profile']);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
