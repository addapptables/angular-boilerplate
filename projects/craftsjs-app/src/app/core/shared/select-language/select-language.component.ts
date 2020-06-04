import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LanguageModel } from './models/language.model';
import { Store, select } from '@ngrx/store';
import * as LanguageActions from './stores/translate.actions';
import { selectAllLanguages, selectLoading, selectLanguage } from './selectors/translate.selector';
import * as moment from 'moment';
import { L10nTranslationService } from 'angular-l10n';

@Component({
  selector: 'app-translate',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent implements OnInit {

  languages$: Observable<LanguageModel[]>;

  loadingLanguage$: Observable<boolean>;

  selectLanguage$: Observable<LanguageModel>;

  constructor(
    readonly _store: Store,
    private readonly _translateService: L10nTranslationService
  ) {
    _store.dispatch(LanguageActions.loadLanguages());
  }

  ngOnInit() {
    this.languages$ = this._store.pipe(
      select(selectAllLanguages)
    );
    this.loadingLanguage$ = this._store.pipe(
      select(selectLoading)
    );
    this.selectLanguage$ = this._store.pipe(
      select(selectLanguage(this._translateService.getLocale()?.language))
    );
  }

  async changeLanguage(language: LanguageModel) {
    await this._translateService.setLocale(language.i18nLocale);
    this.selectLanguage$ = of(language);
    moment.locale(language.id);
  }

}
