import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'lista', component: UsuarioListComponent, title: 'Listagem Usuários' },
      { path: 'form', component: UsuarioFormComponent, title: 'Formulário de Usuários' },
      { path: '', redirectTo: '/usuario/lista', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
