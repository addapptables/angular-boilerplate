import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetEditionDto extends GetPaginated {
    name?: string;
}
