import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from '@craftsjs/perfect-scrollbar';
import { CardModule } from '@craftsjs/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { ScrollDirective } from './directives/scroll.directive';
import { IsGrantedActionColumnPipe } from './pipes/is-granted-action-column.pipe';
import { IsGrantedPipe } from './pipes/is-granted.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MomentFormatPipe,
    ScrollDirective,
    IsGrantedPipe,
    IsGrantedActionColumnPipe
  ],
  exports: [
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    CardModule,
    MatIconModule,
    MomentFormatPipe,
    MatButtonModule,
    ScrollDirective,
    IsGrantedPipe,
    IsGrantedActionColumnPipe
  ]
})
export class SharedModule { }
