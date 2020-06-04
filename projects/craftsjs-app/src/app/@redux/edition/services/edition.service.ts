import { Injectable, Injector } from '@angular/core';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetEditionDto } from '../models/get-edition-dto.model';
import { EditionDto } from '../models/edition-dto.model';
import { CreateEditionDto } from '../models/create-edition-dto.model';
import { UpdateEditionDto } from '../models/update-edition-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EditionService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/editions');
  }

  getAll(input: GetEditionDto) {
    return this.get<GetEditionDto, PaginatedModel<EditionDto>>('', input);
  }

  create(input: CreateEditionDto) {
    return this.post<CreateEditionDto, EditionDto>('', input);
  }

  update(input: UpdateEditionDto) {
    return this.put<UpdateEditionDto, EditionDto>('', input);
  }

  deleteEdition(id: string) {
    return this.delete(id);
  }

}
