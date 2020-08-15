import { Injectable, Injector } from '@angular/core';
import * as UserActions from '@redux/user/actions/user.actions';
import { selectUserActionState } from '@redux/user/selectors/user.selector';
import { ModalService } from '@craftsjs/modal';
import { UserDto } from '@redux/user/models/user-dto.model';
import { UserFormModalComponent } from '../components/user-form-modal/user-form-modal.component';
import { ActionBaseService } from '../../../shared/services/action-base.service';

@Injectable()
export class UserActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, UserActions.userActionComplete(), selectUserActionState);
  }

  openModalUpsert(user: UserDto) {
    this._modalService.show(UserFormModalComponent, user);
  }

  deleteUser(user: UserDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('user.areYouSure', { title: user.name }),
      UserActions.deleteUser({ payload: { id: user.id } })
    );
  }
}
