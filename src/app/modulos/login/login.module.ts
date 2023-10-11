import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { FormLoginComponent } from './form-login/form-login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ], exports: [
    FormLoginComponent
  ]
})
export class LoginModule { }
