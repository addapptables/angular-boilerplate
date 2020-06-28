import { Component, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from '@redux/user/models/user-dto.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '@redux/user/actions/user.actions';
import { AuthService } from '@craftsjs/boilerplate';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-impersonation',
  templateUrl: './user-list-impersonation.component.html',
  styleUrls: ['./user-list-impersonation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListImpersonationComponent implements OnDestroy {

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  unsubscribeAll = new Subject();

  saving$ = this.saveSubject.asObservable();

  constructor(
    private _dialogRef: MatDialogRef<UserListImpersonationComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public tenantId: string,
    private _authService: AuthService,
    private _router: Router
  ) { }

  close() {
    this._dialogRef.close();
  }

  impersonation(user: UserDto) {
    console.log(user);
    this.saveSubject.next(true);
    this._authService.impersonatedAuthenticate({ userId: user.id, tenantImpersonationId: this.tenantId }).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.saveSubject.next(false);
      this.close();
      this._router.navigate(['admin/profile']);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this._store.dispatch(UserActions.userClearStore());
  }

}
