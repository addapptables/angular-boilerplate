import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetUserDto extends GetPaginated {
    userName?: boolean;
    emailAddress?: number;
}
