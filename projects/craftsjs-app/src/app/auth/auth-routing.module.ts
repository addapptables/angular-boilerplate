import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginRouteGuard } from '../shared/services/login-route-guard.service';


const routes: Routes = [{
  path: 'login',
  component: AuthComponent,
  canActivate: [LoginRouteGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
