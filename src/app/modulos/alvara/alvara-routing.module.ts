import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { AutenticacaoGuard } from 'src/app/guardiao/autenticacao.guard';
import { AlvaraFormComponent } from './alvara-form/alvara-form.component';
import { AlvaraListaFilterComponent } from './alvara-lista-filter/alvara-lista-filter.component';


const routes: Routes = [
  {
    path: 'alvara', component: LayoutComponent, canActivate: [AutenticacaoGuard], children: [
      { path: 'lista', component: AlvaraListaFilterComponent, title: 'Lista Alvaras Filter' },
      { path: 'form', component: AlvaraFormComponent, title: 'Cadastro Alvará' },
      { path: 'form/:id', component: AlvaraFormComponent, title: 'Edição Alvará' },
      { path: 'lista/:tipoConsulta', component: AlvaraListaFilterComponent, title: 'Lista Alvarás Filter' },
      { path: '', redirectTo: '/alvara/lista', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlvaraRoutingModule { }
