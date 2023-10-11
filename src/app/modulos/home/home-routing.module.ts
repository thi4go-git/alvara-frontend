import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
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
