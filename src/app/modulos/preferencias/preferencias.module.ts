import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenciasRoutingModule } from './preferencias-routing.module';
import { PreferenciasFormComponent } from './preferencias-form/preferencias-form.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UsuarioModule } from '../usuario/usuario.module';




@NgModule({
  declarations: [
    PreferenciasFormComponent
  ],
  imports: [
    CommonModule,
    PreferenciasRoutingModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTabsModule,
    UsuarioModule

  ], exports: [
    PreferenciasFormComponent
  ]
})
export class PreferenciasModule { }
