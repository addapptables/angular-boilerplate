import { NgModule } from '@angular/core';
import { SelectLanguageComponent } from './select-language.component';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { TranslateEffect } from './effects/translate.effects';
import { TranslateStore } from './stores/translate.store';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MatMenuModule,
    ReduxRegisterModule.forFeature('translate', { languages: TranslateStore }),
    EffectsModule.forFeature([TranslateEffect]),
  ],
  declarations: [SelectLanguageComponent],
  exports: [SelectLanguageComponent]
})
export class LanguageModule { }
