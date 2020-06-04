import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionService, TenantDto } from '@craftsjs/boilerplate';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  isImpersonatedLogin$: Observable<boolean>;

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  tenant$: Observable<TenantDto>;

  constructor(
    private _sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.tenant$ = this._sessionService.tenantObservable;
    // this.isImpersonatedLogin$ = this._sessionService.loginInformationObservable.pipe(
    //   map((result) => result.impersonatorUserId > 0)
    // );
  }

  backToMyAccount() {
    // this.saveSubject.next(true);
    // this._accountService.backToImpersonator().pipe(
    //   takeUntil(componentDestroyed(this)),
    //   switchMap((result) => {
    //     this._authService.setTenantCookie(this._sessionService.loginInformation.impersonatorTenantId);
    //     return this._authService.impersonatedAuthenticate(result.impersonationToken).pipe(
    //       switchMap(() => {
    //         return this._sessionService.init().pipe(
    //           tap(() => {
    //             this._store.dispatch(new ProfileClearStore());
    //             this.saveSubject.next(false);
    //             this._router.navigate(['admin/profile']);
    //           })
    //         );
    //       })
    //     );
    //   })
    // ).subscribe();
  }
}
