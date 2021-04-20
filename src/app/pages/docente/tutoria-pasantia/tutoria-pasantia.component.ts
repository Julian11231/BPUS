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
  new_estado_prouesta:string = "";
  new_estado_actaInicio:string = "";
  new_estado_informe7:string = "";
  new_estado_informe14:string = "";
  new_estado_informeFinal:string = "";

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
        let notas_propuesta:string;
        let notas_actaInicio:string;
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
          form.value.new_estado_prouesta,
          notas_propuesta,
          form.value.new_estado_actaInicio,
          notas_actaInicio,
          notasSemana7,
          form.value.new_estado_informe14,
          notasSemana14,
          form.value.new_estado_informeFinal,
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

  ajustePropuesta(){
    this.new_estado_prouesta = 'Ajustar';
    let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
    notasPropuesta.setAttribute('colspan','5');
    let cancelarAjustePropuesta = (document.getElementById('cancelarAjustePropuesta')) as HTMLButtonElement;
    cancelarAjustePropuesta.setAttribute('style', 'display:block; color: #8F141B');
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    btnAjustePropuesta.setAttribute('style','display:none');
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    notas_propuesta.setAttribute('class','collapse');
  }

  notasPropuesta(){
    let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
    notasPropuesta.setAttribute('colspan','4');
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    notas_propuesta.setAttribute('class','collapse show');
    let ajustePropuesta = (document.getElementById('ajustePropuesta')) as HTMLButtonElement;
    ajustePropuesta.setAttribute('style', 'display:none');
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    btnAjustePropuesta.setAttribute('style','display:block');
  }

  cancelarAjustePropuesta(){
    this.new_estado_prouesta = '';
    let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
    notasPropuesta.setAttribute('colspan','5');
    let ajustePropuesta = (document.getElementById('ajustePropuesta')) as HTMLButtonElement;
    ajustePropuesta.setAttribute('style', 'display:block');
    let cancelarAjustePropuesta = (document.getElementById('cancelarAjustePropuesta')) as HTMLButtonElement;
    cancelarAjustePropuesta.setAttribute('style', 'display:none;');
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    btnAjustePropuesta.setAttribute('style','display:none');
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    notas_propuesta.setAttribute('class','collapse');
  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

  getDataBuscar(data: string) {

  }

}
