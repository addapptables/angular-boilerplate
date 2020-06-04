import { Observable } from 'rxjs';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

export interface IDataSource<T, D = any> {
  total$: Observable<number>;
  displayedColumns: string[];
  loading$: Observable<boolean>;
  data: D[];
  load(pageQuery: PageQueryModel, input: Observable<T>, hasNext$: Observable<boolean>, params?: T): Observable<any>;
}
