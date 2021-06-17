import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  // Alamacenaremos la info del usuario
  usuario = JSON.parse(localStorage.getItem('user'));
  totalprogramas:number = 0;

  constructor(public http: HttpClient) { }

  getProgramas(desde:number) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/programa?desde=${desde}&token=${token}`;
    return this.http.get(url).pipe(map((resp: any) => {
      if (resp.ok == true) {
        this.totalprogramas = resp.total;
        return resp.programas;
      }else{
        return false;
      }
    }));
  }

  // Función para obtener el programa que corresponde el estudiante
  getPrograma() {
    // Obtenemos el id del programa que corresponde al usuario
    let idPrograma = this.usuario.programa;
    // Se obtiene del backend
    let url = URL_SERVICES + '/programa/' + idPrograma;
    return this.http.get(url);
  }
}
