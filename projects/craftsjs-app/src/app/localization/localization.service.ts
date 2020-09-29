import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {

    constructor(private readonly _translateService: TranslateService) { }

    initDefaultLanguage() {
        this._translateService.addLangs(['en', 'es']);
        this._translateService.setDefaultLang('en');
        const browserLang = this._translateService.getBrowserLang();
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        const lang = browserLang.match(/en|es/) ? browserLang : 'en';
        moment.locale(lang);
        this._translateService.use(lang);
    }
}
