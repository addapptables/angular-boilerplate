import { createAction, props } from '@ngrx/store';
import { LanguageModel } from '../models/language.model';

export enum TranslateActionTypes {
  LoadLanguage = '[Translate] Load languages',
  LanguageLoaded = '[Translate] Language loaded'
}

export const loadLanguages = createAction(TranslateActionTypes.LoadLanguage);

export const languagesLoaded = createAction(TranslateActionTypes.LanguageLoaded, props<{ payload: { languages: LanguageModel[] } }>());

