export class CreateTenantDto {
    name: string;
    subDomain: string;
    isActive: boolean;
    editionId?: string;
}
