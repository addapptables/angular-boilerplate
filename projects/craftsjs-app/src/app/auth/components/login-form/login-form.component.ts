import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '@craftsjs/boilerplate';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnDestroy {

  unsubscribeAll = new Subject();

  form: FormGroup;

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  constructor(
    fb: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService,
  ) {
    this.form = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberClient: [false]
    });
  }

  login() {
    if (this.form.invalid) { return; }
    this.saveSubject.next(true);
    this.authService.authenticate(this.form.value).pipe(
      takeUntil(this.unsubscribeAll),
      finalize(() => this.saveSubject.next(false)),
      tap(() => this._router.navigate(['/admin']))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
