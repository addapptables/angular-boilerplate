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
import { OrganizationUnitToolbarComponent } from './components/organization-unit-toolbar/organization-unit-toolbar.component';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { RoleOrganizationUnitStore } from '@redux/organization-unit/stores/role-organization-unit.store';
import { RoleOrganizationUnitEffects } from '@redux/organization-unit/effects/role-organization-unit.effects';

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
    LanguageModule,
    ReduxRegisterModule.forFeature('roleOrganizationUnit', { store: RoleOrganizationUnitStore }),
    EffectsModule.forFeature([RoleOrganizationUnitEffects])
  ],
  declarations: [ToolbarComponent, SearchComponent, ProfileComponent, OrganizationUnitToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
