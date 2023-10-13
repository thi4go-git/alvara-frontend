import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioInfoComponent } from '../usuario-info/usuario-info.component';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { GeralException } from 'src/app/exception/geralException';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {



  usuarioUpdate: Usuario;
  totalElementos = 0;
  pagina = 0;
  tamanho = 0;
  pageSizeOptions: number[] = [10];
  qtdeRegistros: number = 0;
  listaUsuarios: Usuario[] = [];
  colunas = ['foto', 'id', 'username', 'password',
    'role', 'ativo', 'nome', 'cpf', 'email', 'celular', 'admin'];

  mostraProgresso: boolean = false;


  constructor(
    private service: UsuarioService,
    private snackBar: MatSnackBar,
    private authService: AutenticacaoService,
    private router: Router,
    private dialog: MatDialog,
    private avisoDialogService: AvisosDialogService
  ) {
    this.usuarioUpdate = new Usuario();
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  novoUsuario() {
    this.router.navigate(['/usuario/form'])
  }

  listarUsuarios(pagina = 0, tamanho = 10) {

    this.mostraProgresso = true;
    this.service.listarTodos(pagina, tamanho)
      .subscribe({
        next: (resposta) => {
          this.listaUsuarios = resposta.content;
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaUsuarios.length;
          for (let cont = 0; cont < this.listaUsuarios.length; cont++) {
            let user = this.listaUsuarios[cont];
            let roles: string[] = [user.role];
            user.admin = this.authService.isAdmin(roles);
            this.listaUsuarios[cont] = user;
          }
          if (this.listaUsuarios.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (responseError) => {
          this.mostraProgresso = false;
          this.snackBar.open("Erro ao Obter Lista Usuários!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(responseError);
        }
      });

  }


  ativarDesativar(usuario: Usuario) {
    this.mostraProgresso = true;
    this.service.ativarUsuario(usuario.id)
      .subscribe({
        next: (_resposta) => {
          this.snackBar.open("SUCESSO!", "SUCESSO!", {
            duration: 2000
          });
          location.reload();
          this.mostraProgresso = false;
        },
        error: (responseError) => {
          this.mostraProgresso = false;
          this.snackBar.open("erro ativarDesativar!", "Erro!", {
            duration: 2000
          });
          throw new GeralException(responseError);
        }
      });
  }



  ativarDesativarAdm(usuario: Usuario) {
    this.mostraProgresso = true;
    this.service.ativarUsuarioAdm(usuario.id)
      .subscribe({
        next: (_resposta) => {
          this.mostraProgresso = false;
          this.snackBar.open("SUCESSO!", "SUCESSO!", {
            duration: 2000
          });
          location.reload()
        },
        error: (responseError) => {
          this.mostraProgresso = false;
          this.snackBar.open("erro ativarDesativarAdm!", "Erro!", {
            duration: 2000
          });
          throw new GeralException(responseError);
        }
      });

  }


  uploadFoto(event: any, usuario: Usuario) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);

      this.mostraProgresso = true;
      this.service.uploadFoto(usuario.id, formData)
        .subscribe({
          next: (_resposta) => {
            this.listarUsuarios();
            this.mostraProgresso = false;
          },
          error: (responseError) => {
            this.mostraProgresso = false;
            this.snackBar.open("erro ao enviar FOTO", "Erro!", {
              duration: 2000
            });
            throw new GeralException(responseError);
          }
        });
    }
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarUsuarios(this.pagina, this.tamanho);
  }

  prepararUsuarioUpdate(usuario: Usuario) {
    this.usuarioUpdate = usuario;
  }

  infoUsuario(usuario: Usuario) {
    this.dialog.open(UsuarioInfoComponent, {
      width: '400px', height: '450px',
      data: usuario
    });
  }


  dialogExlusaoUsuario(usuario: Usuario) {
    this.avisoDialogService.openConfirmationDialog("Confirma a exclusão do Usuário '"
      + usuario.username + "' ?")
      .then(result => {
        if (result) {
          this.deletarUsuario(usuario);
        } else {
          this.snackBar.open("EXCLUSÃO Cancelada!", "Cancelado!", {
            duration: 3000
          });
        }
      });
  }

  deletarUsuario(usuario: Usuario) {
    this.mostraProgresso = true;
    this.service.deletarporId(usuario.id)
      .subscribe({
        next: (_resposta) => {
          this.snackBar.open("SUCESSO ao Deletar Usuário!", "SUCESSO!", {
            duration: 3000
          });
          this.listarUsuarios();
          this.mostraProgresso = false;
        },
        error: (responseError) => {
          this.mostraProgresso = false;
          this.snackBar.open("ERRO ao Deletar Usuário!", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(responseError);
        }
      });
  }


}
