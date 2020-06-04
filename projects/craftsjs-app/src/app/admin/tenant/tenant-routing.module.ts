import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantLayoutComponent } from './components/tenant-layout/tenant-layout.component';

const routes: Routes = [{
  path: '',
  component: TenantLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
