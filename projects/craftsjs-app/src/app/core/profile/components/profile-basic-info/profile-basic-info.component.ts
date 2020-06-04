import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileDto } from '@redux/profile/models/profile-dto.model';
import { selectProfile, selectProfileLoading } from '@redux/profile/selectors/profile.selector';
import * as ProfileActions from '@redux/profile/actions/profile.actions';
import { SingleSourceBase } from '../../../../shared/services/single-soruce-base';

@Component({
  selector: 'app-profile-basic-info',
  templateUrl: './profile-basic-info.component.html',
  styleUrls: ['./profile-basic-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBasicInfoComponent extends SingleSourceBase<ProfileDto> {

  constructor(_store: Store) {
    super(_store, selectProfile, ProfileActions.loadProfile(), selectProfileLoading);
  }

}
