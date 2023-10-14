import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/model/usuarioDTO';



@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {

  usuarioDto: UsuarioDTO;
  formulario: FormGroup;
  listaErros: string[];
  hide = true;

  mostraProgresso: boolean = false;

  constructor(
    private formBuild: FormBuilder,
    private snackBar: MatSnackBar,
    private service: UsuarioService,
    private router: Router
  ) {
    this.usuarioDto = new UsuarioDTO();
    this.listaErros = [];
    this.formulario = this.formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],
    })
  }


  onSubmit() {
    this.salvarContato();
  }


  salvarContato() {

    const formValues = this.formulario.value;
    let usuario: UsuarioDTO = new UsuarioDTO();
    usuario.username = formValues.username;
    usuario.password = formValues.password;
    usuario.nome = formValues.nome;
    usuario.cpf = formValues.cpf;
    usuario.email = formValues.email;
    usuario.celular = formValues.celular;

    this.mostraProgresso = true;
    this.service
      .salvarUsuario(usuario)
      .subscribe({
        next: (_response) => {
          this.mostraProgresso = false;
          this.snackBar.open("SUCESSO ao salvar Usuário!", "SUCESSO!", {
            duration: 2000
          });
          this.router.navigate(['/preferencias/form'])
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          this.listaErros = errorResponse.error.erros
          this.snackBar.open("ERRO ao salvar Usuário!!", "ERRO!", {
            duration: 2000
          });
        }
      });
  }


  voltarPreferencias() {
    this.router.navigate(['/preferencias/form'])
  }

}
