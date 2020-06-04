import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { Store, MemoizedSelector, select, Action } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { tap, catchError, withLatestFrom, takeUntil } from 'rxjs/operators';

export abstract class DataSourceBase<T> implements DataSource<T> {

  private _dataSubject = new BehaviorSubject<T[]>([]);

  private _unsubscribeAll = new Subject();

  loading$: Observable<boolean>;

  total$: Observable<number>;

  public abstract displayedColumns: string[];

  constructor(
    protected _store: Store,
    protected selectLoading: MemoizedSelector<any, boolean>,
    protected selectTotal: MemoizedSelector<any, number>,
    protected cancelRequestAction: Action
  ) {
    this.loading$ = _store.pipe(
      select(selectLoading)
    );
    this.total$ = _store.pipe(
      select(selectTotal)
    );
  }

  protected loadData(
    pageQuery: PageQueryModel,
    hasNext$: Observable<boolean>,
    selectPaginatedData: (page: PageQueryModel) => MemoizedSelector<any, T[]>,
    actionRequest$: Observable<Action>
  ) {
    this._dataSubject.isStopped && (this._dataSubject = new BehaviorSubject<T[]>([]));
    return this._store.pipe(
      select(selectPaginatedData(pageQuery)),
    ).pipe(
      takeUntil(this._unsubscribeAll),
      withLatestFrom(this.total$, hasNext$, actionRequest$),
      tap(([data, total, hasNext, actionRequest]) => {
        const conditionTotalSize = hasNext || ((total % pageQuery.size) !== data.length);
        const dataLengthIsDifferentTo = (data.length % pageQuery.size) !== 0;
        if (conditionTotalSize && dataLengthIsDifferentTo) {
          this._store.dispatch(actionRequest);
        } else if (data.length > 0) {
          this._dataSubject.next(data);
        } else {
          this._dataSubject.next(data);
          this._store.dispatch(actionRequest);
        }
      }),
      catchError(() => of([]))
    );
  }

  get data() {
    return this._dataSubject.getValue();
  }

  connect(): Observable<T[]> {
    return this._dataSubject.asObservable();
  }

  disconnect(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._dataSubject.next([]);
    this._dataSubject.complete();
    this._store.dispatch(this.cancelRequestAction);
  }
}
