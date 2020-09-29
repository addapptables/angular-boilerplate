import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LanguageModel } from './models/language.model';
import { Store, select } from '@ngrx/store';
import * as LanguageActions from './stores/translate.actions';
import { selectAllLanguages, selectLoading, selectLanguage } from './selectors/translate.selector';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

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
    private readonly _translateService: TranslateService
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
      select(selectLanguage(this._translateService.currentLang))
    );
  }

  async changeLanguage(language: LanguageModel) {
    await this._translateService.use(language.i18nLocale.language).toPromise();
    this.selectLanguage$ = of(language);
    moment.locale(language.id);
  }

}
