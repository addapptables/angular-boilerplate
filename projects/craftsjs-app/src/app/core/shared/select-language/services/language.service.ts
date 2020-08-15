import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor() { }

  getAllLanguages(): Observable<LanguageModel[]> {
    const languages = [
      {
        id: 'en',
        title: 'translate.english',
        country: 'us',
        i18nLocale: {
          language: 'en',
          currency: 'USD'
        }
      },
      {
        id: 'es',
        title: 'translate.spanish',
        country: 'es',
        i18nLocale: {
          language: 'es',
          currency: 'CO'
        }
      }
    ] as LanguageModel[];
    return of(languages);
  }
}
