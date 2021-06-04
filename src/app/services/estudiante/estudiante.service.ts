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
export class EstudianteService {

  totalEstudiantes:number = 0;

  constructor(public http: HttpClient, public router: Router) { }

  getEstudiantes(programa:string, desde: number) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/estudiantes?programa=${programa}&desde=${desde}&token=${token}`;
    return this.http.get(url).pipe(map((resp: any) => {
      if (resp.ok == true) {
        this.totalEstudiantes = resp.total;
        return resp.estudiantes;
      }else{
        return false;
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
    let url = `${URL_SERVICES}/estudiantes/cambiarclave?token=${token}`;
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

  postEstudiante(programa:string, documento_est: FormData) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/estudiantes/actualizar?programa=${programa}&token=${token}`;
    return this.http.post(url, documento_est).pipe(map((resp: any) => {
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