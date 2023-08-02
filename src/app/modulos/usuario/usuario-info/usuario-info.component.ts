import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.component.html',
  styleUrls: ['./usuario-info.component.css']
})
export class UsuarioInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<UsuarioInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) { }


  fecharDialog() {
    this.dialogRef.close();
  }
}
