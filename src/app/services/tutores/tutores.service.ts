import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {

  constructor(public http: HttpClient) { }

  getTutores(idPrograma: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/tutores/${idPrograma}?token=${token}`;
    return this.http.get(url);
  }

}
