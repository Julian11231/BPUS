import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  // Alamacenaremos la info del usuario
  usuario: any;

  constructor(public http: HttpClient) { }

  // Función para obtener el programa que corresponde el estudiante
  getPrograma() {
    // Si es estudiante...
    if (localStorage.getItem('estudiante')) {
      this.usuario = JSON.parse(localStorage.getItem('estudiante'));
    } else {
      this.usuario = JSON.parse(localStorage.getItem('administrativo'));
    }

    // Obtenemos el id del programa que corresponde al usuario
    let idPrograma = this.usuario.programa._id;

    // Se obtiene del backend
    let url = URL_SERVICES + '/programa/' + idPrograma;
    return this.http.get(url);
  }
}
