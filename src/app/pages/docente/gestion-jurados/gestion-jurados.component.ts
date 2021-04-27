import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-jurados',
  templateUrl: './gestion-jurados.component.html',
  styleUrls: ['./gestion-jurados.component.css']
})
export class GestionJuradosComponent implements OnInit {

  pasantias: any[];
  pasantiaSelected: any;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getPasantias();
  }

  getPasantias() {
    this._pasantiaService.getSolicitudesAsignarJurado().subscribe((resp: any) => {
      this.pasantias = resp.pasantias;
      let currentDate = new Date();
      for (let i = 0; i < this.pasantias.length; i++) {
        const pipe = new DatePipe('en-US');
        if(this.pasantias[i].fecha_actaInicio){
          let fechaInicio = new Date(Date.parse(this.pasantias[i].fecha_actaInicio));
          this.pasantias[i].fecha_actaInicio =  pipe.transform(fechaInicio, 'dd-MM-yyyy')
          let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          this.pasantias[i].semanas = Math.floor(diff);
        }
      }
    })
  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

}
