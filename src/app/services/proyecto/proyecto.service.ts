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
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/proyecto/${id}?token=${token}`;
    return this.http.get(url);
  }

  postProyecto(proyecto: any) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/proyecto?token=${token}`;
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

  uploadFichaAcademica(idProyecto: string, documento_fichaAcademica: FormData) {
    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?token=${token}`;
    return this.http.put(url, documento_fichaAcademica).pipe(map((resp: any) => {
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
  
  uploadAnteproyecto(idProyecto: string, documento_anteproyecto: FormData) {
    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?token=${token}`;
    return this.http.put(url, documento_anteproyecto).pipe(map((resp: any) => {
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

  uploadProyecto(idProyecto: string, documento_proyecto: FormData) {
    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?token=${token}`;
    return this.http.put(url, documento_proyecto).pipe(map((resp: any) => {
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

  uploadDocumentoFinal(idProyecto: string, documento_final: FormData) {
    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?token=${token}`;
    return this.http.put(url, documento_final).pipe(map((resp: any) => {
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
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/upload_proyecto/${idProyecto}?jurado=${jurado}&token=${token}`;
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