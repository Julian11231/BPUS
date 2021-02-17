import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Convenio } from '../../models/Convenio.model';
import { URL_SERVICES } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  constructor(public http: HttpClient, public router: Router) { }

  getConvenio(programa:String) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/convenios/${programa}?token=${token}`;;

    return this.http.get(url);
  }


  postConvenio(convenio: Convenio) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/convenios?token=${token}`;

    return this.http.post(url, convenio).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return resp.convenioGuardado;
      }
      //return true;

    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);

    }));

  }

  putEmpresa(id: String, convenio: Convenio) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas/${id}?token=${token}`;

    return this.http.put(url, convenio).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'convenio actualizado correctamente',
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



  deleteEmpresa(id: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas/${id}?token=${token}`;

    return this.http.delete(url).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Empresa eliminada correctamente',
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