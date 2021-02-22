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

  getNotificaciones(usuario: String) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones${usuario}?token=${token}`;
    return this.http.get(url);
  }

  postNotificacion(notificacion: Notificacion) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/notificaciones?token=${token}`;

    return this.http.post(url, notificacion).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'notificación guardada correctamente',
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