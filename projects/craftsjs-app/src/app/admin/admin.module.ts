import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppRouteGuard } from '../shared/services/auth-route-guard.service';
import { ProgressBarModule } from '../core/shared/progress-bar/progress-bar.module';
import { ContainerModule } from '../core/shared/container/container.module';
import { ToolbarModule } from '../core/toolbar/toolbar.module';
import { MenuModule } from '../core/menu/menu.module';
import { LayoutComponent } from '../core/layout/layout.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    MenuModule,
    ToolbarModule,
    ProgressBarModule,
    ContainerModule
  ],
  declarations: [LayoutComponent],
  providers: [AppRouteGuard]
})
export class AdminModule { }
