import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';

@Component({
  selector: 'app-informe-final',
  templateUrl: './informe-final.component.html',
  styleUrls: ['./informe-final.component.css']
})
export class InformeFinalComponent implements OnInit {

  documento_informeFinal = new FormData();
  nombreArchivoInforme: string;
  info:any;

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
      let documento_informeFinal = <File>file;
      this.documento_informeFinal.append('documento_informeFinal', documento_informeFinal, documento_informeFinal.name);
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
        this._pasantiaService.postDocumentoInfFinal(idEstudiante, this.documento_informeFinal).subscribe((resp:any)=>{
          let currentDate = new Date();
          let notificacion = new Notificacion(
            this.info.modalidad.tutor,
            currentDate,
            'Envio de informe final',
            `${this.info.nombres} te ha enviado el informe final`,
            'Administrativo' 
          );
          this._notificacionService.postNotificacion(notificacion).subscribe();
        });

      }
    });
  }

}
