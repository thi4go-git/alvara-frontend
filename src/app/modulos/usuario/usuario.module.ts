import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioInfoComponent } from './usuario-info/usuario-info.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioInfoComponent,
    UsuarioListComponent    
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ], exports: [
    UsuarioFormComponent,
    UsuarioInfoComponent,
    UsuarioListComponent    
  ]
})
export class UsuarioModule { }
