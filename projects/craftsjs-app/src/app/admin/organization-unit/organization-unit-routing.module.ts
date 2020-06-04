import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationUnitLayoutComponent } from './components/organization-unit-layout/organization-unit-layout.component';

const routes: Routes = [{
  path: '',
  component: OrganizationUnitLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationUnitRoutingModule { }
