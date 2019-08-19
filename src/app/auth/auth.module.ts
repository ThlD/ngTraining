import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [AuthComponent, LoginComponent, SingupComponent],
  providers: [],
})
export class AuthModule {
}
