export class CreateUserDto {
    id: string;
    userName: string;
    emailAddress: string;
    name: string;
    surname: string;
    phoneNumber?: string;
    isActive?: boolean;
    roles: string[];
}
