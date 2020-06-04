import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { UserDto } from '@redux/user/models/user-dto.model';
import { FormGroup, Validators } from '@angular/forms';
import { selectUserLoadingAction, selectUserActionState } from '@redux/user/selectors/user.selector';
import * as UserActions from '@redux/user/actions/user.actions';
import { CreateUserDto } from '@redux/user/models/create-user-dto.model';
import { UpdateUserDto } from '@redux/user/models/update-user-dto.model';
import { maxLengthLargeSize, maxLengthSmallSize, maxLengthPassword } from '@redux/user/user.const';
import { FormBase } from '../../../../shared/forms/form-base';
import { UtilValidation } from '../../../../shared/utils/util-validation';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends FormBase implements OnInit {

  maxLengthLargeSize = maxLengthLargeSize;

  maxLengthSmallSize = maxLengthSmallSize;

  maxLengthPassword = maxLengthPassword;

  formGroup: FormGroup;

  @Input()
  userDto: UserDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectUserLoadingAction, selectUserActionState, UserActions.userActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.userDto) { this.userDto = {} as UserDto; }
    this.formGroup = this._fb.group({
      userName: [this.userDto.userName, [UtilValidation.required, Validators.maxLength(this.maxLengthLargeSize)]],
      name: [this.userDto.name, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      surname: [this.userDto.surname, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      emailAddress: [this.userDto.emailAddress, [UtilValidation.required, Validators.email, Validators.maxLength(this.maxLengthLargeSize)]],
      phoneNumber: [this.userDto.phoneNumber, [Validators.maxLength(this.maxLengthLargeSize)]],
      roles: [this.userDto.roles],
      isActive: [true],
      id: [this.userDto.id]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const userDto = { ...this.formGroup.value };
    if (userDto.id) {
      this._update(userDto);
    } else {
      this._create(userDto);
    }
  }

  private _create(user: CreateUserDto) {
    this._store.dispatch(UserActions.createUser({ payload: { user } }));
  }

  private _update(user: UpdateUserDto) {
    this._store.dispatch(UserActions.updateUser({ payload: { user } }));
  }

}
