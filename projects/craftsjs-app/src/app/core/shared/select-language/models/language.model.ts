import { L10nLocale } from 'angular-l10n';

export interface LanguageModel {
    id: string;
    title: string;
    country: string;
    i18nLocale: L10nLocale;
}
