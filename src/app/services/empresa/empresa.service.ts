import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Empresa } from '../../models/Empresa.model';
import { URL_SERVICES } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(public http: HttpClient, public router: Router) { }

  getEmpresas() {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas?token=${token}`;
    //console.log(url);
    return this.http.get(url);
  }

  getEmpresasEncargado(encargadoID:String) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas/empresa/${encargadoID}?token=${token}`;
    //console.log(url);
    return this.http.get(url);
  }


  postEmpresa(empresa: Empresa) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas?token=${token}`;

    return this.http.post(url, empresa).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return resp.empresaGuardada;
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

  putEmpresa(id: String, empresa: Empresa) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/empresas/${id}?token=${token}`;

    return this.http.put(url, empresa).pipe(map((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Empresa actualizada correctamente',
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

