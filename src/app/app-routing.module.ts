import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './modulos/login/form-login/form-login.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/inicio', pathMatch: 'full' },
  { path: 'login', component: FormLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
