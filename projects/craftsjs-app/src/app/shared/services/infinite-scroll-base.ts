import { OnDestroy, Injectable } from '@angular/core';
import { Store, Action, select, MemoizedSelector } from '@ngrx/store';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, withLatestFrom, tap } from 'rxjs/operators';

@Injectable()
export abstract class InfiniteScroll<T, F> implements OnDestroy {

  protected unsubscribeAll = new Subject();

  skip = 0;

  take = 20;

  total = 0;

  loading = false;

  end = false;

  items$: Observable<T[]>;

  total$: Observable<number>;

  loading$: Observable<boolean>;

  filter = new BehaviorSubject<F>({} as F);

  constructor(
    protected _store: Store,
    protected selectTotal: MemoizedSelector<any, number>,
    protected selectItems: MemoizedSelector<any, T[]>,
    protected selectLoading: MemoizedSelector<any, boolean>
  ) {
    this.loading = true;
    this.loadItems();
    this.total$ = this._store.pipe(
      select(selectTotal)
    );
    this.items$ = this._store.pipe(
      select(selectItems)
    );
    this.loading$ = this._store.pipe(
      select(selectLoading)
    ).pipe(
      tap((result) => {
        this.loading = result;
      })
    );
    this._dataChange();
  }

  private _dataChange() {
    this.items$.pipe(
      takeUntil(this.unsubscribeAll),
      withLatestFrom(this.total$),
      tap(([data, total]) => {
        if (total === 0) {
          this.end = true;
        } else if (data.length % this.take !== 0) {
          this.end = true;
        } else {
          this.end = false;
        }
        if (total > this.total && this.total > data.length) {
          this.skip = this.skip + this.take - 1;
          this.take = 1;
          this.loadItems();
          this.take = 20;
          this.skip = this.skip - (this.take - 1);
        }
        this.total = data.length;
      })
    ).subscribe();
  }

  loadItems() {
    this._store.dispatch(this.getLoadAction());
  }

  loadMore() {
    if (this.end || this.loading) { return; }
    this.loading = true;
    this.skip += this.take;
    this.loadItems();
  }

  protected abstract getLoadAction(): Action;

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
