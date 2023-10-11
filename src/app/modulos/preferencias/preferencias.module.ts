import { NgModule } from '@angular/core';
import { PreferenciasRoutingModule } from './preferencias-routing.module';
import { PreferenciasFormComponent } from './preferencias-form/preferencias-form.component';
import { UsuarioModule } from '../usuario/usuario.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PreferenciasFormComponent
  ],
  imports: [
    SharedModule,
    PreferenciasRoutingModule,
    UsuarioModule
  ], exports: [
    PreferenciasFormComponent
  ]
})
export class PreferenciasModule { }
