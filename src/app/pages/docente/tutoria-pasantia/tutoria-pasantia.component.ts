import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { PasantiaTutor } from '../../../models/PasantiaTutor';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tutoria-pasantia',
  templateUrl: './tutoria-pasantia.component.html',
  styleUrls: ['./tutoria-pasantia.component.css']
})
export class TutoriaPasantiaComponent implements OnInit {

  idTutor: string;
  pasantias: any[];
  pasantiaSelected: any;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getPasantias();
  }

  getPasantias() {
    this.idTutor = localStorage.getItem('id');
    this._pasantiaService.getSolicitudesTutor(this.idTutor).subscribe((resp: any) => {
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


  putEstadoInformes(form: NgForm, idPasantia: string) {

    Swal.fire({
      title: '¿Actualizar Pasantía?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {
        let notasSemana7:string;
        let notasSemana14:string; 
        let notasFinal:string;
        if(form.value.notasSemana7 !== ''){
          notasSemana7 = form.value.notasSemana7;
        }
        if(form.value.notasSemana14 !== ''){
          notasSemana14 = form.value.notasSemana14;7;
        }
        if(form.value.notasFinal !== ''){
          notasFinal= form.value.notasFinal;
        } 

        let pasantiaUpdate = new PasantiaTutor(
          form.value.estado_informe7,
          notasSemana7,
          form.value.estado_informe14,
          notasSemana14,
          form.value.estado_informeFinal,
          notasFinal,
        );

        this._pasantiaService.putSolicitudTutor(idPasantia, pasantiaUpdate).subscribe((resp:any)=>{
          if(resp){
            Swal.fire({
              title: '¡Bien hecho!',
              text: 'Pasantia actualizada correctamente',
              icon: 'success',
              confirmButtonText: 'Si',
              showCancelButton: false,
              confirmButtonColor: '#60D89C'        
            }).then((result) => {
              if (result.value) {
                this.getPasantias();
              }
            });
          }
        });
      }
    })

  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

  getDataBuscar(data: string) {

  }

}
