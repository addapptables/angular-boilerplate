import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as LanguageActions from '../stores/translate.actions';
import { map, switchMap } from 'rxjs/operators';
import { LanguageService } from '../services/language.service';

@Injectable()
export class TranslateEffect {

  constructor(private _actions$: Actions, private _translateServiceService: LanguageService) { }

  $loadLanguages = createEffect(() => this._actions$.pipe(
    ofType(LanguageActions.loadLanguages),
    switchMap(() => this._translateServiceService.getAllLanguages()),
    map(languages => LanguageActions.languagesLoaded({ payload: { languages } }))
  ));

}
