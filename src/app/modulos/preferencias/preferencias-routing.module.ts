import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { AutenticacaoGuard } from 'src/app/guardiao/autenticacao.guard';
import { CanMatchGuard } from 'src/app/modulos/preferencias/can-match.guard';
import { PreferenciasFormComponent } from './preferencias-form/preferencias-form.component';

const routes: Routes = [
  {
    path: 'preferencias', component: LayoutComponent,
    canActivate: [CanMatchGuard], children: [
      { path: 'form', component: PreferenciasFormComponent, title: 'Preferências' },
      { path: '', redirectTo: '/preferencias/form', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenciasRoutingModule { }
