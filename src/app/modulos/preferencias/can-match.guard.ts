import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../../servicos/autenticacao.service';



@Injectable({ providedIn: 'root' })
export class CanMatchGuard implements CanActivate {

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

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
      localStorage.clear();
      this.router.navigateByUrl('/login');// navigateByUrl recarrega a Pág.
      return false;
    }


  }


}
