import { Store, Action } from '@craftsjs/ngrx-action';
import { TranslateStoreModel } from '../models/translate-store.model';
import * as LanguageActions from './translate.actions';

@Store<TranslateStoreModel>({
    loading: false,
    languages: []
})
export class TranslateStore {

    @Action(LanguageActions.loadLanguages)
    loadLanguages(state: TranslateStoreModel) {
        return { ...state, loading: true };
    }

    @Action(LanguageActions.languagesLoaded)
    languageLoaded(state: TranslateStoreModel, { payload: { languages } }) {
        return { ...state, loading: false, languages };
    }

}
