import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '../shared/services/auth-route-guard.service';
import { LayoutComponent } from '../core/layout/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  canActivateChild: [AppRouteGuard],
  children: [
    {
      path: '',
      redirectTo: 'profile',
      pathMatch: 'full'
    },
    {
      path: 'profile',
      loadChildren: () => import('projects/craftsjs-app/src/app/core/profile/profile.module').then(m => m.ProfileModule),
    },
    {
      path: 'editions',
      loadChildren: () => import('projects/craftsjs-app/src/app/admin/edition/edition.module').then(m => m.EditionModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('projects/craftsjs-app/src/app/admin/role/role.module').then(m => m.RoleModule),
    },
    {
      path: 'users',
      loadChildren: () => import('projects/craftsjs-app/src/app/admin/user/user.module').then(m => m.UserModule),
    },
    {
      path: 'tenants',
      loadChildren: () => import('projects/craftsjs-app/src/app/admin/tenant/tenant.module').then(m => m.TenantModule),
    },
    {
      path: 'organization-units',
      loadChildren: () => import('projects/craftsjs-app/src/app/admin/organization-unit/organization-unit.module')
        .then(m => m.OrganizationUnitModule),
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
