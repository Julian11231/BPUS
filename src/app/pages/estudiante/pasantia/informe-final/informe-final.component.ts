import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-final',
  templateUrl: './informe-final.component.html',
  styleUrls: ['./informe-final.component.css']
})
export class InformeFinalComponent implements OnInit {

  documento_informeFinal = new FormData();
  nombreArchivoInforme: string;

  documento_aprobacionEmpresa = new FormData();
  nombreArchivoEmpresa: string;

  info = JSON.parse(localStorage.getItem('user'));
  pasantia:any;

  MAX_SIZE_FILE: number = 1000000;

  constructor(public _pasantiaService: PasantiService, 
    public _notificacionService: NotificacionesService, public router: Router) { }

  ngOnInit(): void { this.getPasantia() }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
    })
  }

  getFileInforme(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        location.reload()
      });

    } else {

      this.nombreArchivoInforme = file.name;
      let documento_informeFinal = <File>file;
      this.documento_informeFinal.append('documento_informeFinal', documento_informeFinal, documento_informeFinal.name);
    }
  }

  getFileEmpresa(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        location.reload()
      });

    } else {

      this.nombreArchivoEmpresa = file.name;
      let documento_aprobacionEmpresa = <File>file;
      this.documento_aprobacionEmpresa.append('documento_aprobacionEmpresa', documento_aprobacionEmpresa, documento_aprobacionEmpresa.name);
    }
  }


  enviarInforme() {

    Swal.fire({
      title: '¿Enviar Informe?',
      html: `<p> Se enviaran los documentos a su director</p>`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {
        let idEstudiante = this.info._id;
        this._pasantiaService.postDocumentoInfFinal(idEstudiante, this.documento_informeFinal).subscribe((resp:any)=>{
          if(resp){
            this._pasantiaService.postDocumentoAprobacionEmpresa(idEstudiante,this.documento_aprobacionEmpresa).subscribe((respp:any)=>{
              if(respp){
                let currentDate = new Date();
                let notificacion = new Notificacion(
                  this.pasantia.tutor._id,
                  currentDate,
                  'Envio de informe final',
                  `${this.info.nombres} ${this.info.apellidos} te ha enviado el informe final y el certificado de aprobación de la empresa`,
                  'Administrativo',
                  this.pasantia.tutor.correo 
                );
                this._notificacionService.postNotificacion(notificacion).subscribe();
                this._notificacionService.sendArchivosJurado(this.info._id, notificacion).subscribe();
                Swal.fire({
                  title: '¡Bien Hecho!',
                  text: `Se ha enviado correctamente el documento`,
                  icon: 'success',
                  showCloseButton: false,
                  showConfirmButton: false,
                  showCancelButton: false,
                  allowEnterKey: false,
                  allowOutsideClick:false,
                  allowEscapeKey: false,
                  timer: 1000,
                  timerProgressBar: true
                }).then((result) => {
                  if(result.value || result.dismiss){
                    location.reload()
                  }else{
                    location.reload()
                  }
                });
              }
            });
          }
        });
      }
    });
  }

}
