import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let url = `${URL_SERVICES}/administrativos?campo=${campo}&desde=${desde}`;
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
    let url = `${URL_SERVICES}/administrativos/docentes`;
    return this.http.get(url);
  }

  getTutores(idPrograma: string) {
    let url = `${URL_SERVICES}/administrativos/${idPrograma}`;
    return this.http.get(url);
  }

  postAdmin(admin:any){
    let url = `${URL_SERVICES}/administrativos`;
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
      return throwError("No se pudo crear el usuario");
    }));
  }

  putAdmin(admin:any){
    let url = `${URL_SERVICES}/administrativos`;
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
      return throwError("No se pudo editar al usuario");
    }));
  }

  cambiarEstado(admin:any){
    let url = `${URL_SERVICES}/administrativos/cambiarEstado`;
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
      return throwError("No se pudo cambiar el estado del usuario");
    }));
  }

  deleteAdmin(id:string){
    let url = `${URL_SERVICES}/administrativos/${id}`;
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
      return throwError("No se pudo eliminar al usuario");
    }));
  }

  cambiarClave(usuario: string, clave:string){
    let url = `${URL_SERVICES}/administrativos/cambiarclave`;
    return this.http.put(url, {usuario: usuario, clave: clave}).pipe(map((resp: any) => {
      if (resp.ok == true) {
        localStorage.removeItem("user");
        localStorage.setItem("user",  JSON.stringify(resp.administrativoAct));
        localStorage.setItem("menu",  JSON.stringify(resp.menu));
        return true;
      }
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError("No se le pudo cambiar la clave al usuario");
    }));
  }

}