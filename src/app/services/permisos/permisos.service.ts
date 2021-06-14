import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(public http: HttpClient) { }

  getPermisos() {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/permisos?token=${token}`;
    return this.http.get(url);
  }

  getPermisosPagina(pagina:string) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/permisos/pagina${pagina}?token=${token}`;
    return this.http.get(url);
  }

  postPermiso(permiso: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/permisos?token=${token}`;

    return this.http.post(url, permiso).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return resp.permisoGuardado;
      }
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));
  }

  putPermiso(permiso: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/permisos?token=${token}`;

    return this.http.put(url, permiso).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return resp.permisoActualizado;
      }
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));
  }

}