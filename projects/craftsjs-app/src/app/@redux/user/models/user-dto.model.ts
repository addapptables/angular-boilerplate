export class UserDto {
    id: string;
    userName: string;
    emailAddress: string;
    name: string;
    surname: string;
    isStatic: boolean;
    phoneNumber?: string;
    isActive?: boolean;
    roles: string[];
    permissions: string[];
}
