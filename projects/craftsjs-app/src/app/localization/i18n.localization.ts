import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { L10nTranslationLoader, L10nProvider, L10nConfig, L10nLoader } from 'angular-l10n';
import { Observable } from 'rxjs';

export const l10nConfig: L10nConfig = {
  format: 'language-region',
  providers: [
    { name: 'app', asset: './assets/i18n' }
  ],
  cache: true,
  keySeparator: '.',
  defaultLocale: { language: 'en-US', currency: 'USD' },
  schema: [
    { locale: { language: 'en-US', currency: 'USD' }, dir: 'ltr', text: 'United States' },
    { locale: { language: 'es-CO', currency: 'CO' }, dir: 'ltr', text: 'Colombia' },
    { locale: { language: 'es-ES', currency: 'USD' }, dir: 'ltr', text: 'Ecuador' }
  ]
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
  return () => l10nLoader.init();
}

@Injectable()
export class HttpTranslationLoader implements L10nTranslationLoader {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(@Optional() private http: HttpClient) { }

  public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
    const url = `${provider.asset}/${language}.json`;
    const options = {
      headers: this.headers,
      params: new HttpParams().set('v', provider?.options?.version)
    };
    return this.http.get(url, options);
  }

}
