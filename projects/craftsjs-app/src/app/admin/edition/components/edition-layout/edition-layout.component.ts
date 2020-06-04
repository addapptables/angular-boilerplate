import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EditionActionService } from '../../services/edition-action.service';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import * as EditionActions from '@redux/edition/actions/edition.actions';

@Component({
  selector: 'app-edition-layout',
  templateUrl: './edition-layout.component.html',
  styleUrls: ['./edition-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionLayoutComponent implements OnDestroy {

  constructor(
    private _store: Store,
    private _editionActionService: EditionActionService
  ) { }

  createEdition() {
    this._editionActionService.openModalUpsert({} as EditionDto);
  }

  ngOnDestroy(): void {
    this._store.dispatch(EditionActions.editionClearStore());
  }

}
