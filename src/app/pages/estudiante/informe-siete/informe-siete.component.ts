import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-siete',
  templateUrl: './informe-siete.component.html',
  styleUrls: ['./informe-siete.component.css']
})
export class InformeSieteComponent implements OnInit {

  nombreArchivoInforme: string;
  info:any;
  documento_informe7 = new FormData();

  MAX_SIZE_FILE: number = 1000000

  constructor(public _pasantiaService: PasantiService, public _notificacionService: NotificacionesService, public router:Router) { }

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
      let documento_informe7 = <File>file;
      this.documento_informe7.append('documento_informe7', documento_informe7, documento_informe7.name);
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
          this._pasantiaService.postDocumentoInf7(idEstudiante, this.documento_informe7).subscribe((resp:any)=> {
            if(resp){
              let currentDate = new Date();
              let notificacion = new Notificacion(
                this.info.modalidad.tutor._id,
                currentDate,
                'Envio de informe 7',
                `${this.info.nombres} ${this.info.apellidos} te ha enviado el informe de la semana 7`,
                'Administrativo',
                this.info.modalidad.tutor.correo 
              );
              this._notificacionService.postNotificacion(notificacion).subscribe();
              this._notificacionService.sendInforme7Correo(this.info._id, notificacion).subscribe();
              Swal.fire({
                title: '¡Bien Hecho!',
                text: `Se ha enviado correctamente el documento`,
                icon: 'success',
                confirmButtonText: 'Ok',
                showCancelButton: false,
                confirmButtonColor: '#60D89C',
                timer: 2000
              }).then((result) => {
                if(result.value || result.dismiss){
                  this.router.navigate(['/mi-modalidad']);
                }
              });
            }
          });
      }
    });
  }

}
