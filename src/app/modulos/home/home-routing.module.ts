import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { AutenticacaoGuard } from 'src/app/guardiao/autenticacao.guard';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: 'home', component: LayoutComponent, canActivate: [AutenticacaoGuard], children: [
      { path: 'inicio', component: InicioComponent, title: 'Inicio' },
      { path: '', redirectTo: '/home/inicio', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
