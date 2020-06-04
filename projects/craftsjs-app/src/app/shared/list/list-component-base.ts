import { IDataSource } from './data-source.interface';
import { ViewChild, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export abstract class ListComponentBase<T, D = any> implements OnInit, OnDestroy, AfterViewInit {

  unsubscribeAll = new Subject();

  subscriptionList: Subscription;

  dataSource: IDataSource<T, D>;

  filter = new BehaviorSubject<T>({} as T);

  data = new BehaviorSubject<T>({} as T);

  @Input()
  size = 10;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(datasource: IDataSource<T>) {
    this.dataSource = datasource;
  }

  ngOnInit(): void {
    this.loadDataSource();
  }

  protected loadDataSource() {
    this.subscriptionList && this.subscriptionList.unsubscribe();
    this.subscriptionList = this.dataSource.load(
      this._buildPageQuery(),
      this.getParams(),
      this._hasNextPage(),
      this.filter.getValue()
    ).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      takeUntil(this.unsubscribeAll),
      tap(() => this._loadPage())
    ).subscribe();
    this.dataSource.total$.pipe(
      takeUntil(this.unsubscribeAll),
      tap((total) => {
        const totalIndex = Math.ceil(total / this.paginator.pageSize) - 1;
        if (this.paginator.pageIndex > totalIndex) {
          this.paginator.previousPage();
        }
      })
    ).subscribe();
  }

  protected _loadPage() {
    this.subscriptionList && this.subscriptionList.unsubscribe();
    this.subscriptionList = this.dataSource.load(this._buildPageQuery(),
      this.getParams(),
      this._hasNextPage(),
      this.filter.getValue()
    ).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe();
  }

  protected _buildPageQuery() {
    const pageQuery = {
      index: this.paginator.pageIndex,
      size: this.size
    } as PageQueryModel;
    return pageQuery;
  }

  protected _hasNextPage() {
    return this.dataSource.total$.pipe(
      map(() => this.paginator ? this.paginator.hasNextPage() : false)
    );
  }

  getParams(): Observable<T> {
    return this.filter.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.paginator.ngOnDestroy();
  }
}
