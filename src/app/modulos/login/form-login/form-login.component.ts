import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  username: string;
  password: string;
  erros: string[];
  loginError: boolean;
  hide = true;

  constructor(
    private router: Router,
    private authService: AutenticacaoService,
    private snackBar: MatSnackBar
  ) {
    this.username = '';
    this.password = '';
    this.erros = [];
    this.loginError = false;
  }


  onSubmit() {
    if (this.username && this.password) {
      this.logar();
    } else {
      this.snackBar.open("Favor informar username e Senha!", "Info!", {
        duration: 2000
      });
    }
  }

  logar() {
    this.authService
      .obterToken(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.loginError = false;
          this.erros = [];
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['/home/inicio'])
        },
        error: (errorResponse) => {
          const status = errorResponse.status;
          const msgErro = errorResponse.message;
          this.loginError = true;
          if (status == 0) {
            const infoErr = 'STATUS: (' + status + ") " + msgErro;
            this.erros = [infoErr];
          } else {
            this.erros = [errorResponse.error.error_description];
          }
        }
      });
  }


}
