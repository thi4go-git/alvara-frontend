import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    CabecalhoComponent,
    MenuComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule
  ], exports: [
    CabecalhoComponent,
    MenuComponent,
    RodapeComponent
  ]
})
export class TemplateModule { }
