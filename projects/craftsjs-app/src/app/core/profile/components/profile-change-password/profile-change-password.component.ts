import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormGroupDirective } from '@angular/forms';
import { maxLengthPassword } from '@redux/user/user.const';
import { UserService } from '@redux/user/services/user.service';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotifierService, NotifierType } from '@craftsjs/notifier';
import { PasswordErrorStateMatcher } from '../../../../shared/utils/error-state.util';
import { UtilValidation } from '../../../../shared/utils/util-validation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileChangePasswordComponent implements OnInit, OnDestroy {

  unsubscribeAll = new Subject();

  formGroup: FormGroup;

  maxLengthPassword = maxLengthPassword;

  passwordMatcher = new PasswordErrorStateMatcher();

  saveSubject = new BehaviorSubject<boolean>(false);

  saving$ = this.saveSubject.asObservable();

  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _notifierService: NotifierService,
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      currentPassword: [null, [Validators.maxLength(this.maxLengthPassword), UtilValidation.required]],
      newPassword: [null, [Validators.maxLength(this.maxLengthPassword), UtilValidation.required]],
      repeatPassword: [null, [Validators.maxLength(this.maxLengthPassword), UtilValidation.required]]
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: AbstractControl) {
    const password = group.get('newPassword').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { notSame: true };
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this.saveSubject.next(true);
    this._userService.changePassword(this.formGroup.value).pipe(
      takeUntil(this.unsubscribeAll),
      finalize(() => {
        this.saveSubject.next(false);
      }),
      tap(() => {
        this._notifierService.open({ type: NotifierType.success, message: this._translateService.instant('general.saveSuccessFully') });
        this.formGroup.reset();
        this.formDirective.resetForm();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
