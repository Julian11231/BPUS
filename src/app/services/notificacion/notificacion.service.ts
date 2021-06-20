import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICES } from 'src/app/config/config';
import { Notificacion } from 'src/app/models/notificacion.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(public http: HttpClient, public router: Router) { }

  getNotificaciones(usuarioId: String) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/${usuarioId}?token=${token}`;
    return this.http.get(url);
  }

  getNotificacionesNav(usuarioId: String) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/notificacionesNav/${usuarioId}?token=${token}`;
    return this.http.get(url);
  }

  postNotificacion(notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones?token=${token}`;

    return this.http.post(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok) {  
        console.log('Notificacion enviada');
        return true;
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

  sendNotificacionCorreo(notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correo?token=${token}`;

    return this.http.post(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok) {  
        return true;
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

  sendCartaPresentacionCorreo(idEstudiante:string ,notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correoCartaPresentacion${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  sendPropuestaCorreo(idEstudiante:string ,notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correoPropusta${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  sendActInicioCorreo(idEstudiante:string ,notificacion: Notificacion) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correoActInicio${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {
      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  sendInforme7Correo(idEstudiante:string ,notificacion: Notificacion) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correoInforme7${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {
      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  sendInforme14Correo(idEstudiante:string ,notificacion: Notificacion) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/correoInforme14${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {
      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  sendArchivosJurado(idEstudiante:string ,notificacion: Notificacion) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/archivosJurado${idEstudiante}?token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {
      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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


  sendEvaluacion(idEstudiante:string, jurado:string, notificacion: Notificacion) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/evaluacion${idEstudiante}?jurado=${jurado}&token=${token}`;
    return this.http.post(url, notificacion).pipe(map((resp: any) => {
      if (resp.ok) {  
        console.log('Notificacion Correo enviada');
        return true;
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

  putNotificacion(id: String, notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/${id}?token=${token}`;

    return this.http.put(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'notificación actualizada correctamente',
          icon: 'success'
        }).then(() => {
          location.reload();
        });
      }

      return true;

    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);

    }));

  }

  eliminarNotificacion(id: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones/${id}?token=${token}`;

    return this.http.delete(url).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Notificación eliminada correctamente',
          icon: 'success'
        }).then(() => {
          location.reload();
        });
      }

      return true;

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
