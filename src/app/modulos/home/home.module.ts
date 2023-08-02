import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule
  ], exports: [
    InicioComponent
  ]
})
export class HomeModule { }
