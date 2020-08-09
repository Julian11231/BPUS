import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICES } from 'src/app/config/config';
import { Vacante } from 'src/app/models/Vacante';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  constructor(public http: HttpClient, public router: Router) { }

  getVacantes() {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/vacantes?token=${token}`;
    return this.http.get(url);
  }

  postVacantes(vacante: Vacante) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/vacantes?token=${token}`;

    return this.http.post(url, vacante).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Vacante guardada correctamente',
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


  putVacante(id: String, vacante: Vacante) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/vacantes/${id}?token=${token}`;

    return this.http.put(url, vacante).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Vacante actualizada correctamente',
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



  eliminarVacante(id: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/vacantes/${id}?token=${token}`;

    return this.http.delete(url).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Vacante eliminada correctamente',
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
