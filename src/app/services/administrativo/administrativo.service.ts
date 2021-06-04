import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICES } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

    constructor(public http: HttpClient, public router: Router) { }

  cambiarClave(usuario: string, clave:string){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos/cambiarclave?token=${token}`;
    return this.http.put(url, {usuario: usuario, clave: clave}).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return true;
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