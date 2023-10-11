import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './modulos/login/form-login/form-login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { AutenticacaoGuard } from './guardiao/autenticacao.guard';


const routes: Routes = [

  {
    path: 'alvara',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./modulos/alvara/alvara.module').then(m => m.AlvaraModule)
  },
  {
    path: 'home',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'preferencias',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./modulos/preferencias/preferencias.module').then(m => m.PreferenciasModule)
  },
  {
    path: 'usuario',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },

  { path: 'login', component: FormLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
