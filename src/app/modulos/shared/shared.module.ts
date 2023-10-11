import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe
  ], exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe
  ], providers: [
    provideNgxMask(),
  ]
})
export class SharedModule { }
