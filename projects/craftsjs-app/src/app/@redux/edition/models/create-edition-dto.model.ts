import { EditionType } from './edition-type.enum';

export class CreateEditionDto {
    name: string;
    isFree: boolean;
    price?: number;
    numberOfUsers?: number;
    trialDayCount?: number;
    editionType?: EditionType;
}
