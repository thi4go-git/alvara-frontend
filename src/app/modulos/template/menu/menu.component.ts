import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado: string = "Deslogado";
  authorities: string[] = [];
  administrador: boolean = false;
  versao: string = '';

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
    this.authorities = this.authService.getAuthoritiesToken();
    this.administrador = this.authService.isAdmin(this.authorities);
    this.versao = environment.versao;
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  navegarInicio() {
    this.router.navigate(['/home/inicio']);
  }

  navegarAlvaras() {
    this.router.navigate(['/alvara/lista']);
  }

}
