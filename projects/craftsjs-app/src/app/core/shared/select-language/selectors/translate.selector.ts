import { createSelector } from '@ngrx/store';
import { TranslateStoreModel } from '../models/translate-store.model';

export const selectTranslateState = state => state.translate.languages as TranslateStoreModel;

export const selectAllLanguages = createSelector(
    selectTranslateState,
    translate => translate.languages
);

export const selectLanguage = (languageId: string) => createSelector(
    selectAllLanguages,
    languages => languages.find(x => x.id === languageId)
);

export const selectLoading = createSelector(
    selectTranslateState,
    translate => translate.loading
);
