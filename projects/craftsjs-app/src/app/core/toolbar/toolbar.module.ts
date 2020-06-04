import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { MenuModule as CraftsjsMenuModule } from '@craftsjs/menu-admin';
import { LanguageModule } from '../shared/select-language/select-language.module';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    CraftsjsMenuModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    RouterModule,
    LanguageModule
  ],
  declarations: [ToolbarComponent, SearchComponent, ProfileComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
