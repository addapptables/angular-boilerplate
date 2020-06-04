import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { maxLengthLargeSize, maxLengthSmallSize, maxLengthPassword } from '@redux/user/user.const';
import { FormGroup, Validators } from '@angular/forms';
import {
  selectProfileLoadingAction,
  selectProfileActionState,
  selectProfile,
  selectProfileLoading,
} from '@redux/profile/selectors/profile.selector';
import * as ProfileActions from '@redux/profile/actions/profile.actions';
import { FormBase } from '../../../../../app/shared/forms/form-base';
import { UtilValidation } from '../../../../shared/utils/util-validation';
import { SingleSourceBase } from '../../../../shared/services/single-soruce-base';
import { takeUntil, tap } from 'rxjs/operators';
import { ActionType } from '@redux/shared/models/action-type.model';
import { SessionService } from '@craftsjs/boilerplate';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends FormBase implements OnInit {

  maxLengthLargeSize = maxLengthLargeSize;

  maxLengthSmallSize = maxLengthSmallSize;

  maxLengthPassword = maxLengthPassword;

  formGroup: FormGroup;

  constructor(
    injector: Injector,
    private _sessionService: SessionService
  ) {
    super(injector, selectProfileLoadingAction, selectProfileActionState, ProfileActions.profileActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      userName: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthLargeSize)]],
      name: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      surname: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      emailAddress: [null, [UtilValidation.required, Validators.email, Validators.maxLength(this.maxLengthLargeSize)]],
      profilePictureBase64: [null]
    });
    this._loadCurrentUser();
    this._hearActionSuccess();
  }

  private _loadCurrentUser() {
    const sourceBase = new SingleSourceBase(this._store, selectProfile, ProfileActions.loadProfile(), selectProfileLoading);
    sourceBase.ngOnInit();
    sourceBase.result$.pipe(
      takeUntil(this.unsubscribeAll),
      tap(user => {
        this.formGroup.patchValue(user);
      })
    ).subscribe();
  }

  private _hearActionSuccess() {
    this.actionState$.pipe(
      takeUntil(this.unsubscribeAll),
      tap((result) => {
        if (result === ActionType.success) {
          this._sessionService.init().pipe(
            takeUntil(this.unsubscribeAll)
          ).subscribe();
        }
      })
    ).subscribe();
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this._store.dispatch(ProfileActions.updateProfile({ payload: { profile: this.formGroup.value } }));
  }
}
