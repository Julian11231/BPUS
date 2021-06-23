import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { ProgramaService } from '../programa/programa.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
//import { Modalidad } from 'src/app/models/modalidad.model';

@Injectable({
  providedIn: 'root',
})
export class ModalidadService {
  // Variable que almacenará el porcentaje de créditos aprobados por el estudiante
  porcentaje: any;

  // Inyectamos el módulo de Http y el servicio del programa
  constructor(
    public http: HttpClient,
    public _programaService: ProgramaService
  ) {}

  // Calculamos el porcentaje y se lo pasamos a la variable global
  calcularPorcentaje() {
    this._programaService.getPrograma().subscribe((resp: any) => {
      let infoEstudiante = JSON.parse(localStorage.getItem('user'));
      let credAprob:any;
      credAprob = infoEstudiante.creditos_aprobados;
      let programa = resp.programa;
      let creditosTotales = programa.creditos_totales;
      let porcent = (credAprob * 100) / creditosTotales;
      this.porcentaje = porcent.toFixed(1);
      return this.porcentaje;
    });
  }

  // Función para habilitar el botón de seleccionar modalidad, recibe el array de los botones y las cardheader
  seleccionarModalidad(btnSelec: any[], cardHeader: any[]) {
    // Recibimos las modalidades y se crea un array de las modalidades
    this.getModalidades().subscribe((resp: any) => {
      let modalidades: any[] = resp.modalidades;

      // Se recorren las modalidades
      for (let [i, modalidad] of modalidades.entries()) {
        // Obtenemos los nombres y porcentaje de cada modalidad
        let nombre = modalidad.nombre.toUpperCase();
        let porcentajeMod = modalidad.porcentaje_creditos * 100;

        // Recorremos el array de los cardHeader
        for (let card of cardHeader) {
          // Obtenemos el título de la card
          let titulo = card.innerText;

          // Si el titulo de la card coincide con el nombre de la modalidad
          if (titulo == nombre) {
            // Si el porcentaje del estudiante es mayor al porcentaje de la modaidad
            if (this.porcentaje > porcentajeMod) {
              // Activa el el botón el la card correspondiente
              btnSelec[i].disabled = false;
            }
          }
        }
      }
    });
  }

  // Obtenemos las modalidades del backend
  getModalidades() {
    let token = localStorage.getItem('token');
    let url = URL_SERVICES + '/modalidades?token=' + token;
    return this.http.get(url);
  }

  postModalidad(modalidad: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/modalidades?token=${token}`;

    return this.http.post(url, modalidad).pipe(map((resp: any) => {
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

  putModalidad(modalidad: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/modalidades?token=${token}`;

    return this.http.put(url, modalidad).pipe(map((resp: any) => {
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

  deleteModalidad(id:string){
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/modalidades/${id}?token=${token}`;

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
      return throwError(err);
    }));
  }

}
