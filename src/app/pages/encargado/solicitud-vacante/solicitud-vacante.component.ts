import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';

@Component({
  selector: 'app-mod-solicitud-vacante',
  templateUrl: './solicitud-vacante.component.html',
  styleUrls: ['./solicitud-vacante.component.css']
})
export class EncarSolicitudVacanteComponent implements OnInit {

  info: any;
  solicitudes: any[];
  programa: string;
  vacanteSelected: any;

  constructor(public _pasantiaService: PasantiService, public _notificacionService: NotificacionesService,) { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('user'));
    this.programa = this.info.programa._id;
    this.getSolicitudes();
  }

  aprobarSolicitud() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Vas a aprobar la vacante de '+ this.vacanteSelected.estudiante.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aprobar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.value) {
        let currentDate = new Date();
        let notificacion = new Notificacion(
          this.vacanteSelected.estudiante._id,
          currentDate,
          'Solicitud de vacante aprobada',
          `Te han aprobado tu solicitud de vancante para la empresa ${this.info.empresa.nombre}`,
          'EncargadoEmpresa' 
        );
        this._pasantiaService.cambiarEstadoEncargado(this.vacanteSelected._id, true).subscribe((resp:any) => {
          if(resp){
            this._notificacionService.postNotificacion(notificacion).subscribe((respN:any)=> {
              if(respN){
                this._notificacionService.sendNotificacionCorreo(notificacion).subscribe((respC:any)=>{
                  if(respC){
                    Swal.close();
                    Swal.fire({
                      title: 'Aprobada correctamente',
                      icon: 'success',
                      timer: 2000,
                      showConfirmButton:false,
                      timerProgressBar: true,
                    }).then((result) => {
                      /* Read more about handling dismissals below */
                      if (result.dismiss) {
                        this.getSolicitudes();
                      }
                    });
                  }  
                });
              }
            });    
          }
        });
      }
    });
  }

  rechazarSolicitud(){
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Vas a rechazar la vacante de '+ this.vacanteSelected.estudiante.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Rechazar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.value) {
        let currentDate = new Date();
        let notificacion = new Notificacion(
          this.vacanteSelected.estudiante._id,
          currentDate,
          'Solicitud de vacante rechazada',
          `Te han rechazado tu solicitud de vancante en ${this.info.empresa.nombre}`,
          'EncargadoEmpresa' 
        );
        this._pasantiaService.cambiarEstadoEncargado(this.vacanteSelected._id, false).subscribe((resp:any) => {
          if(resp){
            this._notificacionService.postNotificacion(notificacion).subscribe((respN:any)=> {
              if(respN){
                this._notificacionService.sendNotificacionCorreo(notificacion).subscribe((respC:any)=>{
                  if(respC){
                    Swal.close();
                    Swal.fire({
                      title: 'Rechazada correctamente',
                      icon: 'success',
                      timer: 2000,
                      showConfirmButton:false,
                      timerProgressBar: true,
                    }).then((result) => {
                      /* Read more about handling dismissals below */
                      if (result.dismiss) {
                        this.getSolicitudes();
                      }
                    });
                  }  
                });
              }
            });    
          }
        });
      }
    })
  }

  getSolicitudes() {

    this._pasantiaService.getSolicitudesEncargado(this.info.empresa._id).subscribe((resp: any) => {
      this.solicitudes = resp.pasantias;
      this.vacanteSelected = this.solicitudes[0];
    });
  }

  getDataInfo(data: any) {
    this.vacanteSelected = data;
  }



  getDataBuscar(data) {

  }

}
