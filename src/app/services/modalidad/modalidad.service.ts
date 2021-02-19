import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { ProgramaService } from '../programa/programa.service';
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
      let infoEstudiante = JSON.parse(localStorage.getItem('estudiante'));
      let admin = JSON.parse(localStorage.getItem('administrativo'));
      let credAprob:any;
      if(infoEstudiante){
        credAprob = infoEstudiante.creditos_aprobados;
      }else if(admin.rol === "ADMIN"){
        credAprob = admin.creditos_aprobados;
      }
      

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
}
