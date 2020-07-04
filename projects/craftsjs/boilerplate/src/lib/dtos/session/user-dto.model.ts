export class UserDto {

  id: string;

  userName: string;

  emailAddress: string;

  name: string;

  surname: string;

  phoneNumber?: string;

  isActive?: boolean;

  lastOrganizationUnitId?: string;

  roles: number[];

  permissions: string[];

}
