import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Store, select, MemoizedSelector, Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';

@Directive()
export class SingleSourceBase<T> implements OnInit, OnDestroy {

  unsubscribeAll = new Subject();

  result$: Observable<T>;

  loading$: Observable<boolean>;

  constructor(
    protected _store: Store,
    protected selectSingle: MemoizedSelector<any, T>,
    protected actionLoad: Action,
    protected selectLoading: MemoizedSelector<any, boolean>
  ) { }

  ngOnInit(): void {
    this.result$ = this._store.pipe(
      takeUntil(this.unsubscribeAll),
      select(this.selectSingle),
      tap((result) => {
        if (isEmpty(result)) {
          this._store.dispatch(this.actionLoad);
        }
      })
    );
    this.loading$ = this._store.pipe(
      select(this.selectLoading)
    );
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
