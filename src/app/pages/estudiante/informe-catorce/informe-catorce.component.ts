import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-catorce',
  templateUrl: './informe-catorce.component.html',
  styleUrls: ['./informe-catorce.component.css']
})
export class InformeCatorceComponent implements OnInit {

  nombreArchivoInforme: string;
  info = JSON.parse(localStorage.getItem('user'));
  pasantia:any;
  documento_informe14 = new FormData();

  MAX_SIZE_FILE: number = 1000000;

  constructor(public _pasantiaService: PasantiService, public _notificacionService: NotificacionesService, public router: Router) { }

  ngOnInit(): void {this.getPasantia()}

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
        let idEstudiante = this.info._id;
        this._pasantiaService.postDocumentoInf14(idEstudiante, this.documento_informe14).subscribe((resp:any)=>{
          if(resp){
            let currentDate = new Date();
            let notificacion = new Notificacion(
              this.pasantia.tutor._id,
              currentDate,
              'Envio de informe 14',
              `${this.info.nombres} ${this.info.apellidos}  te ha enviado el informe de la semana 14`,
              'Administrativo',
              this.pasantia.tutor.correo
            );
            this._notificacionService.postNotificacion(notificacion).subscribe();
            this._notificacionService.sendInforme14Correo(this.info._id, notificacion).subscribe();
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

}
