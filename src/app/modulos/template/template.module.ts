import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CabecalhoComponent,
    MenuComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], exports: [
    CabecalhoComponent,
    MenuComponent,
    RodapeComponent
  ]
})
export class TemplateModule { }
