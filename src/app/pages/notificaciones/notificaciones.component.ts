import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { DatePipe } from '@angular/common';
import {interval} from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html'
})

export class NotificacionesComponent {
  notificacionesLeidas: Notificacion[] = [];
  notificacionesNoLeidas: Notificacion[] = [];
  numeroNotificacionesLeidas: number = 0;
  numeroNotificacionesNoLeidas: number = 0;
  usuario = JSON.parse(localStorage.getItem('user'));


  constructor(public _notificacionService: NotificacionesService) {}

   ngOnInit() {
    this.cargarNotificaciones();
    const contador = interval(60000);
    contador.subscribe((n) => {
      this.notificacionesLeidas = [];
      this.notificacionesNoLeidas = [];
      this.cargarNotificaciones();
    });
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const recibidasTab = document.getElementById('recibidasTab');
    const enviadasTab = document.getElementById('enviadasTab');
    recibidasTab.setAttribute('class', 'nav-link text-body');
    enviadasTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  cargarNotificaciones() {
    this._notificacionService.getNotificaciones(this.usuario._id).subscribe((resp:any) => {
      for (let i = 0; i < resp.notificaciones.length; i++) {
        const pipe = new DatePipe('en-US');
        let currentDate = new Date();
        let notiTime = new Date(Date.parse(resp.notificaciones[i].fecha));
        let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(notiTime.getFullYear(), notiTime.getMonth(), notiTime.getDate()) ) /(1000 * 60 * 60 * 24));
        if(diff > 0){
          resp.notificaciones[i].fecha = pipe.transform(resp.notificaciones[i].fecha, 'dd/MM/yyyy');
        }else{
          resp.notificaciones[i].fecha = pipe.transform(resp.notificaciones[i].fecha, 'shortTime');
        }
        if(resp.notificaciones[i].isRead){
          this.notificacionesLeidas.push(resp.notificaciones[i]);
        }else{
          this.notificacionesNoLeidas.push(resp.notificaciones[i]);
        }
      }
      this.numeroNotificacionesLeidas = this.notificacionesLeidas.length;
      this.numeroNotificacionesNoLeidas = this.notificacionesNoLeidas.length;
    });
  }

  borrarNotificacion(notificacion:Notificacion){

    Swal.fire({
      title: '¿Está seguro que deseas borrar la notificación?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then(borrar => {
      
    if (borrar.value) {
      this._notificacionService.eliminarNotificacion(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });
    } 
    });   
  }



 // ACEPTAR Y RECHAZAR NOTIFICACIONES CODIGO VIEJO..

  /*
  aceptarNotificacion(notificacion:Notificacion){
    Swal.fire({
      title: '¿Está seguro que desea aprobar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Aprobarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(notificacionAceptada => {
      
    if (notificacionAceptada.value) {


      // Codigo para aceptar solicitud. ----------------------
      var notificacionAceptar = new Notificacion(
        this.usuario._id,
        "5dd4a006952d6b266002a3e2",
        true,
        "Aprobó la solicitud de",
        "te aprobó la solicitud de"
        
        );

   
      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{
          console.log(resp);
          this.cargarNotificaciones();});

        //---------------------------
      this._notificacionService.crearNotificacion(notificacionAceptar).subscribe(resp => {
        console.log(resp);
       
        });
//---------------------------




    }

    });
  }


  rechazarNotificacion(notificacion:Notificacion){

    Swal.fire({
      title: '¿Está seguro que desea rechazar el proyecto?',
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si, Rechazar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      
    if (borrar.value) {


      var notificacionRechazada = new Notificacion(
        this.usuario._id,
        "5dd4a006952d6b266002a3e2",
        true,
        "Aprobó la solicitud de",
        "te aprobó la solicitud de"
        
        );

      this._notificacionService.borrarNotificaciones(notificacion._id).subscribe(resp=>{           
        console.log(resp);
        this.cargarNotificaciones();
      });

         //---------------------------
         this._notificacionService.crearNotificacion(notificacionRechazada).subscribe(resp => {
          console.log(resp);
         
          });
  //---------------------------

    } 

    });   
  }
*/





  
}


