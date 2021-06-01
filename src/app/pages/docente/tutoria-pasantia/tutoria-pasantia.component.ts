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

  pasantias: any[];
  pasantiaSelected: any;
  //Nuevos estados
  new_estado_prouesta:string = "";
  new_estado_actaInicio:string = "";
  new_estado_informe7:string = "";
  new_estado_informe14:string = "";
  new_estado_informeFinal:string = "";
  //Nuevas notas
  new_notas_propuesta:string = "";
  new_notas_actaInicio:string = "";
  new_notas_informe7:string = "";
  new_notas_informe14:string = "";
  new_notas_informeFinal:string = "";

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getPasantias();
  }

  getPasantias() {
    const user  = JSON.parse(localStorage.getItem('user'));
    this._pasantiaService.getSolicitudesTutor(user._id).subscribe((resp: any) => {
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
        console.log(form.value);
        console.log(this.pasantiaSelected.notas_actaInicio);
        console.log(form.value.notasActaInicio);
        let notasPropuesta:string;let notasActaInicio:string;let notasSemana7:string;let notasSemana14:string; let notasFinal:string;
        if(form.value.notasPropuesta !== ''){
          notasPropuesta = form.value.notasPropuesta;
        }
        if(form.value.notasActaInicio !== ''){
          notasActaInicio = form.value.notasActaInicio;
        }
        if(form.value.notasSemana7 !== ''){
          notasSemana7 = form.value.notasSemana7;
        }
        if(form.value.notasSemana14 !== ''){
          notasSemana14 = form.value.notasSemana14;7;
        }
        if(form.value.notasFinal !== ''){
          notasFinal= form.value.notasFinal;
        }
        if(this.new_estado_prouesta == ""){
          this.new_estado_prouesta = this.pasantiaSelected.estado_propuesta;
        }
        if(this.new_estado_actaInicio == ""){
          this.new_estado_actaInicio = this.pasantiaSelected.estado_actaInicio;
        } 
        if(this.new_estado_informe7 == ""){
          this.new_estado_informe7 = this.pasantiaSelected.estado_informe7;
        } 
        if(this.new_estado_informe14 == ""){
          this.new_estado_informe14 = this.pasantiaSelected.estado_informe14;
        } 
        if(this.new_estado_informeFinal == ""){
          this.new_estado_informeFinal = this.pasantiaSelected.estado_informeFinal;
        }  

        let pasantiaUpdate = new PasantiaTutor(
          this.new_estado_prouesta,
          notasPropuesta,
          this.new_estado_actaInicio,
          notasActaInicio,
          this.new_estado_informe7,
          notasSemana7,
          this.new_estado_informe14,
          notasSemana14,
          this.new_estado_informeFinal,
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
                const btnCloseModalGestion = (document.getElementById("btnCloseModalGestion")) as HTMLElement;
                btnCloseModalGestion.click();
                this.resetDataInfo();
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
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    notasPropuesta.setAttribute('colspan','5');
    btnAjustePropuesta.setAttribute('style','display:none');
    notas_propuesta.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_propuesta !== "Enviada") {
      let cancelarAjustePropuesta = (document.getElementById('cancelarAjustePropuesta')) as HTMLButtonElement;
      cancelarAjustePropuesta.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasPropuesta(){
    let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    if(this.pasantiaSelected?.estado_propuesta === 'Aprobada'){
      let ajustePropuesta = (document.getElementById('ajustePropuesta')) as HTMLButtonElement;
      notasPropuesta.setAttribute('colspan','4');
      notas_propuesta.setAttribute('class','collapse show');
      btnAjustePropuesta.setAttribute('style','display:block');
      ajustePropuesta.setAttribute('style', 'display:none');
    }else if(this.new_estado_prouesta === 'Ajustar'){
      notasPropuesta.setAttribute('colspan','4');
      notas_propuesta.setAttribute('class','collapse show');
      btnAjustePropuesta.setAttribute('style','display:block');
    }else{
      this.new_notas_propuesta = '';
      notasPropuesta.setAttribute('colspan','5');
      notas_propuesta.setAttribute('class','collapse');
      btnAjustePropuesta.setAttribute('style','display:none');
    }
  }

  cancelarAjustePropuesta(){
    this.new_estado_prouesta = '';
    this.new_notas_propuesta = '';
    let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
    let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
    let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
    notasPropuesta.setAttribute('colspan','5');
    btnAjustePropuesta.setAttribute('style','display:none');
    notas_propuesta.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_propuesta !== "Enviada") {
      let ajustePropuesta = (document.getElementById('ajustePropuesta')) as HTMLButtonElement;
      let cancelarAjustePropuesta = (document.getElementById('cancelarAjustePropuesta')) as HTMLButtonElement;
      ajustePropuesta.setAttribute('style', 'display:block');
      cancelarAjustePropuesta.setAttribute('style', 'display:none;');
    }
  }

  ajusteActaInicio(){
    this.new_estado_actaInicio = 'Ajustar';
    let notasActaInicio = (document.getElementById("notasActaInicio")) as HTMLElement;
    let notas_actaInicio = (document.getElementById("notas_actaInicio")) as HTMLElement;
    let btnAjusteActaInicio = (document.getElementById("btnAjusteActaInicio")) as HTMLElement;
    notasActaInicio.setAttribute('colspan','5');
    btnAjusteActaInicio.setAttribute('style','display:none');
    notas_actaInicio.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_actaInicio !== "Enviada") {
      let cancelarAjusteActaInicio = (document.getElementById('cancelarAjusteActaInicio')) as HTMLButtonElement;
      cancelarAjusteActaInicio.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasActaInicio(){
      let notasActaInicio = (document.getElementById("notasActaInicio")) as HTMLElement;
      let notas_actaInicio = (document.getElementById("notas_actaInicio")) as HTMLElement;
      let btnAjusteActaInicio = (document.getElementById("btnAjusteActaInicio")) as HTMLElement;
      if(this.pasantiaSelected?.estado_actaInicio === 'Aprobada'){
        let ajusteActaInicio = (document.getElementById('ajusteActaInicio')) as HTMLButtonElement;
        notasActaInicio.setAttribute('colspan','4')
        notas_actaInicio.setAttribute('class','collapse show');
        btnAjusteActaInicio.setAttribute('style','display:block');
        ajusteActaInicio.setAttribute('style', 'display:none');
      }else if(this.new_estado_actaInicio === 'Ajustar'){
        notasActaInicio.setAttribute('colspan','4');
        notas_actaInicio.setAttribute('class','collapse show');
        btnAjusteActaInicio.setAttribute('style','display:block');
      }else{
        this.new_notas_actaInicio = '';
        notas_actaInicio.setAttribute('class','collapse');
        notasActaInicio.setAttribute('colspan','5');
        btnAjusteActaInicio.setAttribute('style','display:none');
      }
  }

  cancelarAjusteActaInicio(){
    this.new_estado_actaInicio = '';
    this.new_notas_actaInicio = '';
    let notasActaInicio = (document.getElementById("notasActaInicio")) as HTMLElement;
    let btnAjusteActaInicio = (document.getElementById("btnAjusteActaInicio")) as HTMLElement;
    let notas_actaInicio = (document.getElementById("notas_actaInicio")) as HTMLElement;
    btnAjusteActaInicio.setAttribute('style','display:none');
    notas_actaInicio.setAttribute('class','collapse');
    notasActaInicio.setAttribute('colspan','5');
    if(this.pasantiaSelected.estado_actaInicio !== "Enviada") {
      let ajusteActaInicio = (document.getElementById('ajusteActaInicio')) as HTMLButtonElement;
      let cancelarAjusteActaInicio = (document.getElementById('cancelarAjusteActaInicio')) as HTMLButtonElement;
      ajusteActaInicio.setAttribute('style', 'display:block');
      cancelarAjusteActaInicio.setAttribute('style', 'display:none;');
    }
  }

  ajusteInfome7(){
    this.new_estado_informe7 = 'Ajustar';
    let notasSemana7 = (document.getElementById("notasSemana7")) as HTMLElement;
    let notas_informe7 = (document.getElementById("notas_informe7")) as HTMLElement;
    let btnAjusteInforme7 = (document.getElementById("btnAjusteInforme7")) as HTMLElement;
    notasSemana7.setAttribute('colspan','5');
    btnAjusteInforme7.setAttribute('style','display:none');
    notas_informe7.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_informe7 !== "Enviada") {
      let cancelarAjusteInforme7 = (document.getElementById('cancelarAjusteInforme7')) as HTMLButtonElement;
      cancelarAjusteInforme7.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasInforme7(){
      let notasSemana7 = (document.getElementById("notasSemana7")) as HTMLElement;
      let notas_informe7 = (document.getElementById("notas_informe7")) as HTMLElement;
      let btnAjusteInforme7 = (document.getElementById("btnAjusteInforme7")) as HTMLElement;
      if(this.pasantiaSelected?.estado_informe7 === 'Aprobado'){
        let ajusteInforme7 = (document.getElementById('ajusteInforme7')) as HTMLButtonElement;
        notasSemana7.setAttribute('colspan','4')
        notas_informe7.setAttribute('class','collapse show');
        btnAjusteInforme7.setAttribute('style','display:block');
        ajusteInforme7.setAttribute('style', 'display:none');
      }else if(this.new_estado_informe7 === 'Ajustar'){
        notasSemana7.setAttribute('colspan','4');
        notas_informe7.setAttribute('class','collapse show');
        btnAjusteInforme7.setAttribute('style','display:block');
      }else{
        this.new_notas_informe7 = '';
        notas_informe7.setAttribute('class','collapse');
        notasSemana7.setAttribute('colspan','5');
        btnAjusteInforme7.setAttribute('style','display:none');
      }
  }

  cancelarAjusteInforme7(){
    this.new_estado_informe7 = '';
    this.new_notas_informe7 = '';
    let notasSemana7 = (document.getElementById("notasSemana7")) as HTMLElement;
    let btnAjusteInforme7 = (document.getElementById("btnAjusteInforme7")) as HTMLElement;
    let notas_informe7 = (document.getElementById("notas_informe7")) as HTMLElement;
    btnAjusteInforme7.setAttribute('style','display:none');
    notas_informe7.setAttribute('class','collapse');
    notasSemana7.setAttribute('colspan','5');
    if(this.pasantiaSelected.estado_informe7 !== "Enviada") {
      let ajusteInforme7 = (document.getElementById('ajusteInforme7')) as HTMLButtonElement;
      let cancelarAjusteInforme7 = (document.getElementById('cancelarAjusteInforme7')) as HTMLButtonElement;
      ajusteInforme7.setAttribute('style', 'display:block');
      cancelarAjusteInforme7.setAttribute('style', 'display:none;');
    }
  }

  ajusteInfome14(){
    this.new_estado_informe14 = 'Ajustar';
    let notasSemana14 = (document.getElementById("notasSemana14")) as HTMLElement;
    let notas_informe14 = (document.getElementById("notas_informe14")) as HTMLElement;
    let btnAjusteInforme14 = (document.getElementById("btnAjusteInforme14")) as HTMLElement;
    notasSemana14.setAttribute('colspan','5');
    btnAjusteInforme14.setAttribute('style','display:none');
    notas_informe14.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_informe14 !== "Enviada") {
      let cancelarAjusteInforme14 = (document.getElementById('cancelarAjusteInforme14')) as HTMLButtonElement;
      cancelarAjusteInforme14.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasInforme14(){
      let notasSemana14 = (document.getElementById("notasSemana14")) as HTMLElement;
      let notas_informe14 = (document.getElementById("notas_informe14")) as HTMLElement;
      let btnAjusteInforme14 = (document.getElementById("btnAjusteInforme14")) as HTMLElement;
      if(this.pasantiaSelected?.estado_informe14 === 'Aprobado'){
        let ajusteInforme14 = (document.getElementById('ajusteInforme14')) as HTMLButtonElement;
        notasSemana14.setAttribute('colspan','4')
        notas_informe14.setAttribute('class','collapse show');
        btnAjusteInforme14.setAttribute('style','display:block');
        ajusteInforme14.setAttribute('style', 'display:none');
      }else if(this.new_estado_informe14 === 'Ajustar'){
        notasSemana14.setAttribute('colspan','4');
        notas_informe14.setAttribute('class','collapse show');
        btnAjusteInforme14.setAttribute('style','display:block');
      }else{
        this.new_notas_informe14 = '';
        notas_informe14.setAttribute('class','collapse');
        notasSemana14.setAttribute('colspan','5');
        btnAjusteInforme14.setAttribute('style','display:none');
      }
  }

  cancelarAjusteInforme14(){
    this.new_estado_informe14 = '';
    this.new_notas_informe14 = '';
    let notasSemana14 = (document.getElementById("notasSemana14")) as HTMLElement;
    let btnAjusteInforme14 = (document.getElementById("btnAjusteInforme14")) as HTMLElement;
    let notas_informe14 = (document.getElementById("notas_informe14")) as HTMLElement;
    btnAjusteInforme14.setAttribute('style','display:none');
    notas_informe14.setAttribute('class','collapse');
    notasSemana14.setAttribute('colspan','5');
    if(this.pasantiaSelected.estado_informe14 !== "Enviada") {
      let ajusteInforme14 = (document.getElementById('ajusteInforme14')) as HTMLButtonElement;
      let cancelarAjusteInforme14 = (document.getElementById('cancelarAjusteInforme14')) as HTMLButtonElement;
      ajusteInforme14.setAttribute('style', 'display:block');
      cancelarAjusteInforme14.setAttribute('style', 'display:none;');
    }
  }

  ajusteInfomeFinal(){
    this.new_estado_informeFinal = 'Ajustar';
    let notasSemanaFinal = (document.getElementById("notasSemanaFinal")) as HTMLElement;
    let notas_informeFinal = (document.getElementById("notas_informeFinal")) as HTMLElement;
    let btnAjusteInformeFinal = (document.getElementById("btnAjusteInformeFinal")) as HTMLElement;
    notasSemanaFinal.setAttribute('colspan','5');
    btnAjusteInformeFinal.setAttribute('style','display:none');
    notas_informeFinal.setAttribute('class','collapse');
    if(this.pasantiaSelected.estado_informeFinal !== "Enviada") {
      let cancelarAjusteInformeFinal = (document.getElementById('cancelarAjusteInformeFinal')) as HTMLButtonElement;
      cancelarAjusteInformeFinal.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasInformeFinal(){
      let notasSemanaFinal = (document.getElementById("notasSemanaFinal")) as HTMLElement;
      let notas_informeFinal = (document.getElementById("notas_informeFinal")) as HTMLElement;
      let btnAjusteInformeFinal = (document.getElementById("btnAjusteInformeFinal")) as HTMLElement;
      if(this.pasantiaSelected?.estado_informeFinal === 'Aprobado'){
        let ajusteInformeFinal = (document.getElementById('ajusteInformeFinal')) as HTMLButtonElement;
        notasSemanaFinal.setAttribute('colspan','4')
        notas_informeFinal.setAttribute('class','collapse show');
        btnAjusteInformeFinal.setAttribute('style','display:block');
        ajusteInformeFinal.setAttribute('style', 'display:none');
      }else if(this.new_estado_informeFinal === 'Ajustar'){
        notasSemanaFinal.setAttribute('colspan','4');
        notas_informeFinal.setAttribute('class','collapse show');
        btnAjusteInformeFinal.setAttribute('style','display:block');
      }else{
        this.new_notas_informeFinal = '';
        notas_informeFinal.setAttribute('class','collapse');
        notasSemanaFinal.setAttribute('colspan','5');
        btnAjusteInformeFinal.setAttribute('style','display:none');
      }
  }

  cancelarAjusteInformeFinal(){
    this.new_estado_informeFinal = '';
    this.new_notas_informeFinal = '';
    let notasSemanaFinal = (document.getElementById("notasSemanaFinal")) as HTMLElement;
    let btnAjusteInformeFinal = (document.getElementById("btnAjusteInformeFinal")) as HTMLElement;
    let notas_informeFinal = (document.getElementById("notas_informeFinal")) as HTMLElement;
    btnAjusteInformeFinal.setAttribute('style','display:none');
    notas_informeFinal.setAttribute('class','collapse');
    notasSemanaFinal.setAttribute('colspan','5');
    if(this.pasantiaSelected.estado_informeFinal !== "Enviada") {
      let ajusteInformeFinal = (document.getElementById('ajusteInformeFinal')) as HTMLButtonElement;
      let cancelarAjusteInformeFinal = (document.getElementById('cancelarAjusteInformeFinal')) as HTMLButtonElement;
      ajusteInformeFinal.setAttribute('style', 'display:block');
      cancelarAjusteInformeFinal.setAttribute('style', 'display:none;');
    }
  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

  resetDataInfo(){
    this.new_estado_prouesta = "";
    this.new_estado_actaInicio = "";
    this.new_estado_informe7 = "";
    this.new_estado_informe14 = "";
    this.new_estado_informeFinal = "";
    this.new_notas_propuesta = "";
    this.new_notas_actaInicio = "";
    this.new_notas_informe7 = "";
    this.new_notas_informe14 = "";
    this.new_notas_informeFinal = "";
    //reset propuesta
    if(this.pasantiaSelected.estado_propuesta){
      let notasPropuesta = (document.getElementById("notasPropuesta")) as HTMLElement;
      let btnAjustePropuesta = (document.getElementById("btnAjustePropuesta")) as HTMLElement;
      let notas_propuesta = (document.getElementById("notas_propuesta")) as HTMLElement;
      notasPropuesta.setAttribute('colspan','5');
      btnAjustePropuesta.setAttribute('style','display:none');
      notas_propuesta.setAttribute('class','collapse');
      if(this.pasantiaSelected.estado_propuesta === "Aprobada") {
        let cancelarAjustePropuesta = (document.getElementById('cancelarAjustePropuesta')) as HTMLButtonElement;
        let ajustePropuesta = (document.getElementById('ajustePropuesta')) as HTMLButtonElement;
        cancelarAjustePropuesta.setAttribute('style', 'display:none;');
        ajustePropuesta.setAttribute('style', 'display:block;');
      }
    }
    //reset acta inicio
    if(this.pasantiaSelected.estado_actaInicio){
      let notasActaInicio = (document.getElementById("notasActaInicio")) as HTMLElement;
      let notas_actaInicio = (document.getElementById("notas_actaInicio")) as HTMLElement;
      let btnAjusteActaInicio = (document.getElementById("btnAjusteActaInicio")) as HTMLElement;
      notasActaInicio.setAttribute('colspan','5');
      btnAjusteActaInicio.setAttribute('style','display:none');
      notas_actaInicio.setAttribute('class','collapse');
      if(this.pasantiaSelected.estado_actaInicio === "Aprobada") {
        let cancelarAjusteActaInicio = (document.getElementById('cancelarAjusteActaInicio')) as HTMLButtonElement;
        let ajusteActaInicio = (document.getElementById('ajusteActaInicio')) as HTMLButtonElement;
        cancelarAjusteActaInicio.setAttribute('style', 'display:none;');
        ajusteActaInicio.setAttribute('style', 'display:block;');
      }
    }
    if(this.pasantiaSelected.estado_informe7){
      let notasSemana7 = (document.getElementById("notasSemana7")) as HTMLElement;
      let notas_informe7 = (document.getElementById("notas_informe7")) as HTMLElement;
      let btnAjusteInforme7 = (document.getElementById("btnAjusteInforme7")) as HTMLElement;
      notasSemana7.setAttribute('colspan','5');
      btnAjusteInforme7.setAttribute('style','display:none');
      notas_informe7.setAttribute('class','collapse');
      if(this.pasantiaSelected.estado_informe7 === "Enviada") {
        let cancelarAjusteInforme7 = (document.getElementById('cancelarAjusteInforme7')) as HTMLButtonElement;
        let ajusteInforme7 = (document.getElementById('ajusteInforme7')) as HTMLButtonElement;
        cancelarAjusteInforme7.setAttribute('style', 'display:none;');
        ajusteInforme7.setAttribute('style', 'display:block;');
      }
    }
    if(this.pasantiaSelected.estado_informe14){
      let notasSemana14 = (document.getElementById("notasSemana14")) as HTMLElement;
      let notas_informe14 = (document.getElementById("notas_informe14")) as HTMLElement;
      let btnAjusteInforme14 = (document.getElementById("btnAjusteInforme14")) as HTMLElement;
      notasSemana14.setAttribute('colspan','5');
      btnAjusteInforme14.setAttribute('style','display:none');
      notas_informe14.setAttribute('class','collapse');
      if(this.pasantiaSelected.estado_informe14 === "Enviada") {
        let cancelarAjusteInforme14 = (document.getElementById('cancelarAjusteInforme14')) as HTMLButtonElement;
        let ajusteInforme14 = (document.getElementById('ajusteInforme14')) as HTMLButtonElement;
        cancelarAjusteInforme14.setAttribute('style', 'display:none;');
        ajusteInforme14.setAttribute('style', 'display:block;');
      }
    }
    if(this.pasantiaSelected.estado_informeFinal){
      let notasSemanaFinal = (document.getElementById("notasSemanaFinal")) as HTMLElement;
      let notas_informeFinal = (document.getElementById("notas_informeFinal")) as HTMLElement;
      let btnAjusteInformeFinal = (document.getElementById("btnAjusteInformeFinal")) as HTMLElement;
      notasSemanaFinal.setAttribute('colspan','5');
      btnAjusteInformeFinal.setAttribute('style','display:none');
      notas_informeFinal.setAttribute('class','collapse');
      if(this.pasantiaSelected.estado_informeFinal === "Enviada") {
        let cancelarAjusteInformeFinal = (document.getElementById('cancelarAjusteInformeFinal')) as HTMLButtonElement;
        let ajusteInformeFinal = (document.getElementById('ajusteInformeFinal')) as HTMLButtonElement;
        cancelarAjusteInformeFinal.setAttribute('style', 'display:none;');
        ajusteInformeFinal.setAttribute('style', 'display:block;');
      }
    }      
  }

}
