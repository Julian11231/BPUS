import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';

@Component({
  selector: 'app-informe-catorce',
  templateUrl: './informe-catorce.component.html',
  styleUrls: ['./informe-catorce.component.css']
})
export class InformeCatorceComponent implements OnInit {

  nombreArchivoInforme: string;
  info:any;
  documento_informe14 = new FormData();

  MAX_SIZE_FILE: number = 1000000;

  constructor(public _pasantiaService: PasantiService, public _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
    }else{
      this.info = admin;
    }
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
      let documento_informe14 = <File>file;
      this.documento_informe14.append('documento_informe14', documento_informe14, documento_informe14.name);
    }
  }


  enviarInforme() {

    Swal.fire({
      title: '¿Enviar Informe?',
      html: `<p> Se enviará el documento a su tutor asignado</p>`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {
        let idEstudiante = localStorage.getItem('id');
        this._pasantiaService.postDocumentoInf14(idEstudiante, this.documento_informe14).subscribe((resp:any)=>{
          let currentDate = new Date();
          let notificacion = new Notificacion(
            this.info.modalidad.tutor,
            currentDate,
            'Envio de informe 14',
            `${this.info.nombres} te ha enviado el informe de la semana 14`,
            'Administrativo' 
          );
          this._notificacionService.postNotificacion(notificacion).subscribe();
        });

      }
    });
  }

}
