import { EditionType } from './edition-type.enum';

export class EditionDto {
    id: string;
    name: string;
    isFree: boolean;
    price?: number;
    numberOfUsers?: number;
    trialDayCount?: number;
    editionType?: EditionType;
}
