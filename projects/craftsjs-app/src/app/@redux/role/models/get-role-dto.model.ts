import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetRoleDto extends GetPaginated {
    name?: string;
}
