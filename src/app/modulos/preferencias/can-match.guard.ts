import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../../servicos/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class CanMatchGuard implements CanActivate {



  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Implemente a lógica para verificar se a rota pode ser ativada aqui
    // Retorne true se a rota puder ser ativada ou false caso contrário

    const autenticado = this.authService.isAuthenticated();

    if (autenticado) {
      const isAdmin = this.authService.isAdmin(this.authService.getAuthoritiesToken());
      if (isAdmin) {
        return true;
      }
      alert("Somente administradores podem acessar esse módulo!");
      this.router.navigate(['/home/inicio']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


  }


}
