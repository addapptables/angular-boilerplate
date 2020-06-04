import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu.component';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { MenuModule as CraftsjsMenuModule } from '@craftsjs/menu-admin';
import { MenuStore } from '@redux/menu/stores/menu.store';
import { MenuEffects } from '@redux/menu/effects/menu.effects';

@NgModule({
  imports: [
    SharedModule,
    ReduxRegisterModule.forFeature('menu', { sidebar: MenuStore }),
    EffectsModule.forFeature([MenuEffects]),
    CraftsjsMenuModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
