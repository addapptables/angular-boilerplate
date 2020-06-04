import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProfileActions from '@redux/profile/actions/profile.actions';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileLayoutComponent implements OnDestroy {

  constructor(private _store: Store) { }

  ngOnDestroy(): void {
    this._store.dispatch(ProfileActions.cancelProfileRequest());
    this._store.dispatch(ProfileActions.profileClearStore());
  }

}
