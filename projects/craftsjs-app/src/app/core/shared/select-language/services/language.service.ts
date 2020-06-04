import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LanguageModel } from '../models/language.model';
import { L10nLocale } from 'angular-l10n';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor() { }

  getAllLanguages(): Observable<LanguageModel[]> {
    const languages = [
      {
        id: 'en-US',
        title: 'translate.english',
        country: 'us',
        i18nLocale: {
          language: 'en-US',
          currency: 'USD'
        } as L10nLocale
      },
      {
        id: 'es-CO',
        title: 'translate.spanish',
        country: 'es',
        i18nLocale: {
          language: 'es-CO',
          currency: 'CO'
        } as L10nLocale
      }
    ] as LanguageModel[];
    return of(languages);
  }
}
