import { Injectable, Injector } from '@angular/core';
import { ModalService } from '@craftsjs/modal';
import * as EditionActions from '@redux/edition/actions/edition.actions';
import { selectEditionActionState } from '@redux/edition/selectors/edition.selector';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { EditionFormModalComponent } from '../components/edition-form-modal/edition-form-modal.component';
import { ActionBaseService } from '../../../shared/services/action-base.service';

@Injectable()
export class EditionActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, EditionActions.editionActionComplete(), selectEditionActionState);
  }

  openModalUpsert(edition: EditionDto) {
    this._modalService.show(EditionFormModalComponent, edition);
  }

  deleteEdition(edition: EditionDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('edition.areYouSure', { title: edition.name }),
      EditionActions.deleteEdition({ payload: { id: edition.id } })
    );
  }
}
