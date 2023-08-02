import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AlvaraRoutingModule } from './alvara-routing.module';
import { AlvaraFormComponent } from './alvara-form/alvara-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlvaraListaFilterComponent } from './alvara-lista-filter/alvara-lista-filter.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CnpjFormatPipe } from 'src/app/pipes/cnpj-format.pipe';



@NgModule({
  declarations: [
    AlvaraFormComponent,
    AlvaraListaFilterComponent,
    CnpjFormatPipe
  ],
  imports: [
    CommonModule,
    AlvaraRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule
  ], exports: [
    AlvaraFormComponent, 
    AlvaraListaFilterComponent
  ]
})
export class AlvaraModule { }
