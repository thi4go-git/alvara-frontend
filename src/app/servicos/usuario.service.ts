import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { UsuarioDTO } from '../model/usuarioDTO';
import { UsuarioPaginator } from '../model/usuarioPaginator';





@Injectable({ providedIn: 'root' })
export class UsuarioService {

  apiUsuario: string = environment.apiUrl + '/api/usuarios';

  constructor(private http: HttpClient) { }

  listarTodos(page: number, size: number): Observable<UsuarioPaginator> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<UsuarioPaginator>(this.apiUsuario + "?" + params.toString());
  }

  salvarUsuario(usuarioDto: UsuarioDTO): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUsuario + '/novo', usuarioDto);
  }

  uploadFoto(id: number, formData: FormData): Observable<any> {
    return this.http.put(this.apiUsuario + "/" + id + "/adicionar-foto", formData, { responseType: 'blob' });
  }

  ativarUsuario(id: number): Observable<any> {
    return this.http.patch(this.apiUsuario + "/ativar/" + id, null);
  }

  ativarUsuarioAdm(id: number): Observable<any> {
    return this.http.patch(this.apiUsuario + "/ativardesativaradm/" + id, null);
  }

  deletarporId(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUsuario + "/delete/" + id);
  }


}
