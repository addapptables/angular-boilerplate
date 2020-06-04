import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, tap, takeUntil } from 'rxjs/operators';
import { TenantActionService } from '../services/tenant-action.service';
import { SessionService } from '@craftsjs/boilerplate';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  savingSubject = new BehaviorSubject<boolean>(false);

  saving$ = this.savingSubject.asObservable();

  unsubscribeAll = new Subject();

  @Output()
  save = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _tenantActionService: TenantActionService,
    private _sessionService: SessionService
  ) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      name: [null, [Validators.maxLength(64)]]
    });
  }

  changeTenant() {
    if (this.formGroup.invalid) { return; }
    this.savingSubject.next(true);
    if (!this.formGroup.value.name) {
      this.changeToHost();
      this.savingSubject.next(false);
      return;
    }
    this.changeToTenant();
  }

  changeToTenant() {
    this._tenantActionService.isTenantAvailable(this.formGroup.value).pipe(
      takeUntil(this.unsubscribeAll),
      finalize(() => this.savingSubject.next(false)),
      tap(tenant => {
        const isChanged = this._tenantActionService.changeTenant(tenant, this.formGroup.value.name);
        if (isChanged) {
          this.initSession();
        }
      })
    ).subscribe();
  }

  changeToHost() {
    this._tenantActionService.setTenantCookie(undefined);
    this.initSession();
  }

  initSession() {
    this._sessionService.init().pipe(
      takeUntil(this.unsubscribeAll),
      finalize(() => this.savingSubject.next(false)),
      tap(() => this.save.emit())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
