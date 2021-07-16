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

  getProyecto() {
    let url = `${URL_SERVICES}/proyecto/estudiante`;
    return this.http.get(url);
  }

  getProyectoEnviados(programa:string) {
    let url = `${URL_SERVICES}/proyecto/porPrograma/${programa}`;
    return this.http.get(url);
  }

  getProyectosDirector(director:string){
    let url = `${URL_SERVICES}/proyecto/director/${director}`;
    return this.http.get(url);
  }

  getProyectosAsignarJurados(programa:string){
    let url = `${URL_SERVICES}/proyecto/asignarJurado/${programa}`;
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

  aceptarProyecto(idProyecto: string){
    let url = `${URL_SERVICES}/proyecto/aprobarSerParteProyecto/${idProyecto}`;
    return this.http.put(url, null).pipe(map((resp: any) => {
      if (resp.ok) {
        let user = JSON.parse(localStorage.getItem("user"));
        localStorage.removeItem("user");
        user.modalidad = user.modalidad._id;
        localStorage.setItem("user",  JSON.stringify(user));
        localStorage.removeItem("NoEntre");
        localStorage.removeItem("modalidad");
        return resp.proyectoSave;
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

  rechazarProyecto(idProyecto: string){
    let url = `${URL_SERVICES}/proyecto/rechazarSerParteProyecto/${idProyecto}`;
    return this.http.put(url, null).pipe(map((resp: any) => {
      if (resp.ok) {
        let user = JSON.parse(localStorage.getItem("user"));
        localStorage.removeItem("user");
        delete user.modalidad;
        localStorage.setItem("user",  JSON.stringify(user));
        localStorage.removeItem("NoEntre");
        localStorage.removeItem("modalidad");
        return resp.proyectoSave;
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

  putJefeProyecto(idProyecto: string, proyecto:any){
    let url = `${URL_SERVICES}/proyecto/jefeProyecto/${idProyecto}`;
    return this.http.put(url, proyecto).pipe(map((resp: any) => {
      return resp.ok;
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));
  }

  putDirectorProyecto(idProyecto: string, proyecto:any){
    let url = `${URL_SERVICES}/proyecto/directorProyecto/${idProyecto}`;
    return this.http.put(url, proyecto).pipe(map((resp: any) => {
      return resp.ok;
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));
  }

  asignarJurados(id: string, proyecto: any) {
    let url = `${URL_SERVICES}/proyecto/asignarJurados/${id}`;
    return this.http.put(url, proyecto).pipe(map((resp: any) => {
      return resp.ok;
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));
  }

  evaluar(id: string, proyecto: any) {
    let url = `${URL_SERVICES}/proyecto/evaluar/${id}`;
    return this.http.put(url, proyecto).pipe(map((resp: any) => {
      return resp.ok;
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