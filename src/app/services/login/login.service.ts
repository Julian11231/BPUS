import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Definimos una variable global "token" para después asignarle un valor
  token: string;

  constructor(public router: Router, public http: HttpClient) {
  }

  renuevaToken(){
    let url = URL_SERVICES+'/login/renuevatoken';
    return this.http.get(url).pipe(map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token',this.token);
      return true;
    }), catchError((err) => {
      return throwError('No se pudo renovar el token');
    }));
  }

  logueado() {
    this.token = localStorage.getItem("token");
    if(this.token){
      return (this.token.length > 5) ? true : false;
    }else{
      return false;
    }

  }

  logOut() {
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario) {
    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.token = resp.token;
        let usuario= (JSON.parse(atob(this.token.split('.')[1]))).usuario;
        localStorage.setItem('user',JSON.stringify(usuario));
        if(resp.modalidad){
          localStorage.setItem('modalidad',JSON.stringify(resp.modalidad));
        }
        if(resp.menu){
          localStorage.setItem('menu',JSON.stringify(resp.menu));
        }
        return true;
    }),catchError((err) => {
        Swal.fire({
          title: '¡Error!',
          text: err.error.mensaje,
          icon: 'error',
          confirmButtonColor: '#8F141B'
        });
        return throwError(err);
      }));
  }
}
