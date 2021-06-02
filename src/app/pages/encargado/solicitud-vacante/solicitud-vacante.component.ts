import { Component, OnInit } from '@angular/core';
import { PasantiService, NotificacionesService, ConvenioService } from 'src/app/services/service.index';
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
  convenio:any;
  programa: string;
  vacanteSelected: any;

  constructor(private _pasantiaService: PasantiService, 
              private _notificacionService: NotificacionesService,
              private _convenioService: ConvenioService) { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('user'));
    this.programa = this.info.programa._id;
    this.getSolicitudes();
  }

  getSolicitudes() {
    this._convenioService.getConvenioEncargado(this.info._id).subscribe((resp:any)=>{
      this.convenio = resp.convenio;
      this._pasantiaService.getSolicitudesEncargado(this.convenio.empresa._id).subscribe((resp: any) => {
        this.solicitudes = resp.pasantias;
        this.vacanteSelected = this.solicitudes[0];
      });
    });
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
          `Te han aprobado tu solicitud de vancante para la empresa ${this.convenio.empresa.nombre}`,
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
          `Te han rechazado tu solicitud de vancante en ${this.convenio.empresa.nombre}`,
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

  getDataInfo(data: any) {
    this.vacanteSelected = data;
  }

  getDataBuscar(data) {

  }

}
