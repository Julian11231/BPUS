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

  totalAdmins:number = 0;

  getAdmins(desde:number, campo: string) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos?campo=${campo}&desde=${desde}&token=${token}`;
    return this.http.get(url).pipe(map((resp: any) => {
      if (resp.ok == true) {
        this.totalAdmins = resp.total;
        return resp.admins;
      }else{
        return false;
      }
    }));
  }

  getDocentes() {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos/docentes?token=${token}`;
    return this.http.get(url);
  }

  postAdmin(admin:any){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos?token=${token}`;
    return this.http.post(url, admin).pipe(map((resp: any) => {
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

  putAdmin(admin:any){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos?token=${token}`;
    return this.http.put(url, admin).pipe(map((resp: any) => {
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


  deleteAdmin(id:string){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos/${id}?token=${token}`;
    return this.http.delete(url).pipe(map((resp: any) => {
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

  cambiarClave(usuario: string, clave:string){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/administrativos/cambiarclave?token=${token}`;
    return this.http.put(url, {usuario: usuario, clave: clave}).pipe(map((resp: any) => {
      if (resp.ok == true) {
        localStorage.removeItem("user");
        localStorage.setItem("user",  JSON.stringify(resp.administrativoAct));
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