import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { CardModule } from '@addapptables/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    MatIconModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
