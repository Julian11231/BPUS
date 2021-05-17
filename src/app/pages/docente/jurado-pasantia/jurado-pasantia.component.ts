import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { PasantiaEvaluar } from '../../../models/PasantiaEvaluar.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-jurado-pasantia',
  templateUrl: './jurado-pasantia.component.html',
  styleUrls: ['./jurado-pasantia.component.css']
})
export class JuradoPasantiaComponent implements OnInit {

  pasantias:any;
  user:any;
  pasantiaSelected:any;
  
  evaluacion_jurado:string = "";
  notas_jurado = "";

  documento_evaluacion_jurado = new FormData();
  MAX_SIZE_FILE: number = 1000000;
  nombreArchivoEvaluacion: string;

  constructor(public _pasantiaService: PasantiService, public _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    this.user  = JSON.parse(localStorage.getItem('administrativo'));
    this.getPasantias();
  }

  getPasantias() {
    this._pasantiaService.getSolicitudesJurado(this.user._id).subscribe((resp: any) => {
      this.pasantias = resp.pasantias;
      console.log(this.pasantias);
      let currentDate = new Date();
      const pipe = new DatePipe('en-US');
      for (let i = 0; i < this.pasantias.length; i++) {
        if(this.pasantias[i].fecha_actaInicio){
          let fechaInicio = new Date(Date.parse(this.pasantias[i].fecha_actaInicio));
          this.pasantias[i].fecha_actaInicio =  pipe.transform(fechaInicio, 'dd-MM-yyyy');
          let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          this.pasantias[i].semanas = Math.floor(diff);
        }if(this.pasantias[i].sustentacion_fecha){
          let sustentacion_fecha = new Date(Date.parse(this.pasantias[i].sustentacion_fecha));
          this.pasantias[i].sustentacion_fecha =  pipe.transform(sustentacion_fecha, 'dd-MM-yyyy');
        }
      }
    });
  }

  getFileEvaluacion(file: File) {
    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        this.documento_evaluacion_jurado = new FormData();
        this.nombreArchivoEvaluacion = null;
      });
    } else {
      this.nombreArchivoEvaluacion = file.name;
      let documento_evaluacion_jurado = <File>file;
      this.documento_evaluacion_jurado.append('documento_evaluacion_jurado', documento_evaluacion_jurado, documento_evaluacion_jurado.name);
    }
  }

  notasJurado(){
    const notas_jurado = (document.getElementById('notas_jurado')) as HTMLElement;
    if(this.evaluacion_jurado === "Ajustar"){
      notas_jurado.setAttribute('class','collapse show');
    }else{
      this.notas_jurado = "";
      notas_jurado.setAttribute('class','collapse');
    }
  }

  evaluarPasantia(f: NgForm){
    Swal.fire({
      html: `Evaluaras de la sustentación de la pasantia de ${this.pasantiaSelected.estudiante.nombres}`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if(result.value){
        const pasantia = new PasantiaEvaluar(this.user._id, this.evaluacion_jurado, this.notas_jurado);
        this._pasantiaService.evaluar(this.pasantiaSelected._id, pasantia).subscribe((resp:any) => {
          this._pasantiaService.postDocumentoEvaluacion(this.pasantiaSelected.estudiante._id, this.user._id, this.documento_evaluacion_jurado).subscribe((respp:any) => {
            const fecha = new Date();
            const notificacion = new Notificacion(
              this.pasantiaSelected.estudiante._id,
              fecha,
              'Evaluacion de pasantia',
              `El jurado ${this.user.nombres} ${this.user.apellidos} te ha calificado la sustentación`,
              'Estudiante',
              this.pasantiaSelected.estudiante.correo);
              this._notificacionService.postNotificacion(notificacion).subscribe();
              if(respp.estado == 'Aprobada'){
                const notificacionA = new Notificacion(
                  this.pasantiaSelected.estudiante._id,
                  fecha,
                  'Pasantia completada',
                  `Ambos jurados te han aprobado la pasantia, felicidades!`,
                  'Estudiante',
                  this.pasantiaSelected.estudiante.correo);
                  this._notificacionService.postNotificacion(notificacionA).subscribe();
                  this._notificacionService.sendNotificacionCorreo(notificacionA).subscribe();
              }
              this._notificacionService.sendEvaluacion(this.pasantiaSelected.estudiante._id, this.user._id, notificacion).subscribe();
              const btnCerrar = (document.getElementById('btnCerrar')) as HTMLElement;
              btnCerrar.click();
              this.getPasantias();
              Swal.fire({
                title: '¡Bien hecho!',
                text: 'Evaluación enviada correctamente',
                icon: 'success',
                timer: 2000,
                confirmButtonText: 'Aceptar',
                showCancelButton: false,
                confirmButtonColor: '#60D89C',
              });
          });
        });
      }
    });
  }

  clearDataInfo(){
    this.documento_evaluacion_jurado = new FormData();
    this.nombreArchivoEvaluacion = null;
    this.evaluacion_jurado = "";
    this.notas_jurado = "";
    const notas_jurado = (document.getElementById('notas_jurado')) as HTMLElement;
    notas_jurado.setAttribute('class','collapse');
  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

}
