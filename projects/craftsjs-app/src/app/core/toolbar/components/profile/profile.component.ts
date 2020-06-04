import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@craftsjs/boilerplate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  constructor(
    private _router: Router,
    private appSessionService: SessionService
  ) { }

  closeSession() {
    this.appSessionService.logout();
    this._router.navigate(['/']);
  }

  viewProfile() {
    this._router.navigate(['/admin/profile']);
  }

}
