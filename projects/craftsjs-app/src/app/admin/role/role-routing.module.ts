import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleLayoutComponent } from './component/role-layout/role-layout.component';

const routes: Routes = [{
  path: '',
  component: RoleLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
