import { NgModule } from '@angular/core';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioInfoComponent } from './usuario-info/usuario-info.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioInfoComponent,
    UsuarioListComponent
  ],
  imports: [
    SharedModule,
    UsuarioRoutingModule
  ], exports: [
    UsuarioFormComponent,
    UsuarioInfoComponent,
    UsuarioListComponent
  ]
})
export class UsuarioModule { }
