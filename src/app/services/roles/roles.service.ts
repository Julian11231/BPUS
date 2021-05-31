import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(public http: HttpClient) { }

  getRoles() {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/roles?token=${token}`;
    return this.http.get(url);
  }

  postRol(empresa: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/roles?token=${token}`;

    return this.http.post(url, empresa).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return resp.rolGuardado;
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