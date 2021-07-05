import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
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
    this.notificacionesLeidas = [];
    this.notificacionesNoLeidas = [];
    this._notificacionService.getNotificaciones(this.usuario._id).subscribe((resp:any) => {
      for (let i = 0; i < resp.notificaciones.length; i++) {
        let currentDate = new Date().getTime();
        let notiTime = new Date(Date.parse(resp.notificaciones[i].fecha)).getTime();
        let diff = currentDate - notiTime;
        let difminutos = Math.floor(diff/(1000*60));
        if(difminutos < 5){
          resp.notificaciones[i].fecha = "Hace un momento";
        }else if(difminutos >= 5 && difminutos < 60){
          resp.notificaciones[i].fecha = "Hace "+difminutos+" minutos";
        }else{
          let difhoras = Math.floor(diff/(1000*60*60));
          if(difhoras == 1){
            resp.notificaciones[i].fecha = "Hace "+difhoras+" hora";
          }else if(difhoras > 1 && difhoras < 24){
            resp.notificaciones[i].fecha = "Hace "+difhoras+" horas";
          }else{
            let difdias = Math.floor(diff/(1000*60*60*24));
            if(difdias == 1){
              resp.notificaciones[i].fecha = "Hace "+difdias+" día";
            }else if(difdias > 1 && difdias < 7){
              resp.notificaciones[i].fecha = "Hace "+difdias+" días";
            }else{
              let difSemanas = Math.floor(diff/(1000*60*60*24));
              if(difSemanas == 1){
                resp.notificaciones[i].fecha = "Hace "+difSemanas+" semana";
              }else if(difSemanas > 1 && difSemanas < 4){
                resp.notificaciones[i].fecha = "Hace "+difSemanas+" semanas";
              }else{
  
              }
            }
          }
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

  marcarLeida(id:string){
    Swal.fire({
      title:"Marcar como leida",
      icon: "question",
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33',
      showCloseButton:false,
    }).then((result) => {
      if(result.value){
        this._notificacionService.isReadTrue(id).subscribe((resp:any)=>{
          if(resp){
            this.cargarNotificaciones();
          }
        });
      }
    });
  }

  borrarNotificacion(notificacion:Notificacion){
    Swal.fire({
      title: '¿Está seguro que deseas borrar la notificación?',
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, cancelar!'
    }).then(borrar => {
    if (borrar.value) {
      this._notificacionService.eliminarNotificacion(notificacion._id).subscribe(resp=>{           
        this.cargarNotificaciones();
      });
    } 
    });   
  }
  
}


