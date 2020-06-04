import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditionLayoutComponent } from './components/edition-layout/edition-layout.component';

const routes: Routes = [{
  path: '',
  component: EditionLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditionRoutingModule { }
