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
export class ProyectoService {

  constructor(public http: HttpClient, public router: Router) { }

  getProyecto(id: string) {
    let url = `${URL_SERVICES}/proyecto/${id}`;
    return this.http.get(url);
  }

  postProyecto(proyecto: any) {
    let url = `${URL_SERVICES}/proyecto`;
    return this.http.post(url, proyecto).pipe(map((resp: any) => {
      if (resp.ok) {
        localStorage.removeItem("user");
        localStorage.setItem("user",  JSON.stringify(resp.estudianteSave));
        return resp.solicitudGuardada;
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

  uploadDocumento(idProyecto: string, documento: FormData) {
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}`;
    return this.http.put(url, documento).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return resp.proyecto;
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

  postDocumentoEvaluacion(idProyecto: string, jurado:string, documento_evaluacion_jurado: FormData) {
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?jurado=${jurado}`;
    return this.http.put(url, documento_evaluacion_jurado).pipe(map((resp: any) => {
      if (resp.ok == true) {
        return resp.proyectoActualizado;
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