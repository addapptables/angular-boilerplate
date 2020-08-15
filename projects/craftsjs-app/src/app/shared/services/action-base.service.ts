import { OnDestroy, Injector, Type, Injectable } from '@angular/core';
import { AlertService } from '@craftsjs/alert';
import { Store, Action, select, MemoizedSelector } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import { ActionType } from '@redux/shared/models/action-type.model';
import { NotifierService } from '@craftsjs/notifier';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class ActionBaseService implements OnDestroy {

  protected unsubscribeAll = new Subject();
  protected _store: Store;
  protected _notifierService: NotifierService;
  protected _alertService: AlertService;
  protected _translateService: TranslateService;
  protected _actionComplete: Action;
  protected _selectRoleActionState: MemoizedSelector<any, ActionType>;

  constructor(injector: Injector, _actionComplete: Action, _selectRoleActionState: MemoizedSelector<any, ActionType>) {
    this._store = injector.get(Store as Type<Store>);
    this._alertService = injector.get(AlertService as Type<AlertService>);
    this._translateService = injector.get(TranslateService);
    this._notifierService = injector.get(NotifierService as Type<NotifierService>);
    this._actionComplete = _actionComplete;
    this._selectRoleActionState = _selectRoleActionState;
  }

  protected delete(title: string, message: string, actionDelete: Action) {
    const dialog = this._alertService.showConfirmation(title, message);
    dialog.beforeClosed().pipe(
      takeUntil(this.unsubscribeAll),
    ).subscribe((decision) => {
      if (decision && decision.result === 'ok') {
        this._store.dispatch(actionDelete);
        this._hearDeleteSuccess();
      }
    });
  }

  private _hearDeleteSuccess() {
    const subscription = this._store.pipe(
      select(this._selectRoleActionState),
      takeUntil(this.unsubscribeAll),
      tap((result) => {
        if (result === ActionType.delete) {
          this._notifierService.openSuccess(this._translateService.instant('general.deletesuccessfully'));
          this._store.dispatch(this._actionComplete);
          subscription.unsubscribe();
        } else if (result === ActionType.error) {
          this._store.dispatch(this._actionComplete);
          subscription.unsubscribe();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
