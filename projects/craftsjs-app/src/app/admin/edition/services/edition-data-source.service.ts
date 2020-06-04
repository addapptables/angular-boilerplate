import { Injectable } from '@angular/core';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { GetEditionDto } from '@redux/edition/models/get-edition-dto.model';
import { Store } from '@ngrx/store';
import { selectEditionLoading, selectEditionTotal, selectEditionsPage } from '@redux/edition/selectors/edition.selector';
import * as EditionActions from '@redux/edition/actions/edition.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataSource } from '../../../shared/list/data-source.interface';
import { DataSourceBase } from '../../../shared/services/data-source-base';

@Injectable()
export class EditionDataSourceService extends DataSourceBase<EditionDto> implements IDataSource<GetEditionDto> {

  public displayedColumns: string[] = ['actions', 'name', 'isFree', 'price', 'editionType', 'trialDayCount', 'numberOfUsers'];

  constructor(_store: Store) {
    super(_store, selectEditionLoading, selectEditionTotal, EditionActions.cancelEditionRequest());
  }

  load(pageQuery: PageQueryModel, getEditionDto$: Observable<GetEditionDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectEditionsPage,
      getEditionDto$.pipe(
        map((getUserDto) => EditionActions.loadEditions({
          payload: {
            filter: {
              ...getUserDto,
              skip: pageQuery.index * pageQuery.size,
              take: pageQuery.size
            }
          }
        }))
      ));
  }
}
