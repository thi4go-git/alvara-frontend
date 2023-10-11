import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ], exports: [
    InicioComponent
  ]
})
export class HomeModule { }
