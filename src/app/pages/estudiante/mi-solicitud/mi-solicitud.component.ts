import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-solicitud',
  templateUrl: './mi-solicitud.component.html',
  styleUrls: ['./mi-solicitud.component.css']
})
export class MiSolicitudComponent implements OnInit {

  info = JSON.parse(localStorage.getItem('user'));
  pasantia: any;
  fechaInicio:string;
  semanas:any;

  constructor(public _pasantiaService: PasantiService, public router: Router) { }

  ngOnInit(): void {
    if(this.info.modalidad !== null){
      this.getPasantia();
    }else{
      this.router.navigate(['/modalidades'])
    }
  }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
      console.log(this.pasantia)
      const pipe = new DatePipe('en-US');
      let currentDate = new Date();
      if(this.pasantia.fecha_actaInicio){
        let fechaInicio = new Date(Date.parse(this.pasantia.fecha_actaInicio));
        let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
        this.semanas = Math.floor(diff);
        this.fechaInicio =  pipe.transform(fechaInicio, 'dd-MM-yyyy');
      }
    });
  }

}
