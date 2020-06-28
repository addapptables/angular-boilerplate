import { UserDto } from './user-dto.model';
import { TenantDto } from './tenant-dto.model';


export class LoginInformationDto {

  user?: UserDto;

  tenant?: TenantDto;

  impersonatorUserId?: string;

}
