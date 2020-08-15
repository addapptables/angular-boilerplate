import { Store, MemoizedSelector, select, Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { OnInit, Output, EventEmitter, OnDestroy, Injector, Type, Directive } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from '@craftsjs/notifier';
import { ActionType } from '@redux/shared/models/action-type.model';
import { TranslateService } from '@ngx-translate/core';

@Directive()
export class FormBase implements OnInit, OnDestroy {

  unsubscribeAll = new Subject();

  loadingAction$: Observable<boolean>;

  protected _store: Store;

  protected _fb: FormBuilder;

  protected _notifierService: NotifierService;

  protected _translateService: TranslateService;

  protected actionState$: Observable<ActionType>;

  @Output()
  save = new EventEmitter<ActionType>();

  constructor(
    protected injector: Injector,
    protected selectorLoadingAction: MemoizedSelector<any, boolean>,
    protected selectorActionState: MemoizedSelector<any, ActionType>,
    protected actionComplete: Action
  ) {
    this._store = injector.get(Store as Type<Store>);
    this._fb = injector.get(FormBuilder as Type<FormBuilder>);
    this._notifierService = injector.get(NotifierService as Type<NotifierService>);
    this._translateService = injector.get(TranslateService);
  }

  ngOnInit(): void {
    this.loadingAction$ = this._store.pipe(
      select(this.selectorLoadingAction)
    );
    this._onActionSuccess();
  }

  private _onActionSuccess() {
    this.actionState$ = this._store.pipe(
      select(this.selectorActionState)
    );
    this.actionState$.pipe(
      takeUntil(this.unsubscribeAll),
      tap((result) => {
        if (result === ActionType.success) {
          this.save.emit(ActionType.success);
          this._store.dispatch(this.actionComplete);
          this._notifierService.openSuccess(this._translateService.instant('general.saveSuccessFully'));
        } else if (result === ActionType.updated) {
          this.save.emit(ActionType.updated);
          this._store.dispatch(this.actionComplete);
          this._notifierService.openSuccess(this._translateService.instant('general.saveSuccessFully'));
        } else if (result === ActionType.error) {
          this._store.dispatch(this.actionComplete);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
