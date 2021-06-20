import { Component, OnInit } from '@angular/core';
import { AdministrativoService,NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-administrativos',
  templateUrl: './admin-administrativos.component.html',
  styleUrls: ['./admin-administrativos.component.css']
})
export class AdminAdministrativosComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  admins:any;

  desde: number = 0;
  campo:string = "nombres"
  pagina:number = 1;
  totalpaginas:number = 0

  constructor(private _notiService: NotificacionesService, private _adminService:AdministrativoService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this._adminService.getAdmins(this.desde, this.campo).subscribe((resp:any)=>{
      this.admins = resp;
      console.log(resp);
      this.totalpaginas = Math.ceil(this._adminService.totalAdmins/10);
    })
  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
  
    if (desde >= this._adminService.totalAdmins) {
      return;
    }
    if (desde <0 ) {
      return;
    }
    this.desde += valor;
    this.pagina = (this.desde/10)+1;
    this.getAdmins();
  }

  cambiarDesdeInput(valor:number){
    this.desde = (valor-1)*10;
    if(valor > this.totalpaginas){
      const inputPagina = (document.getElementById('pagina')) as HTMLInputElement;
      inputPagina.value = this.pagina.toString();
      return;
    }
    if (this.desde >= this._adminService.totalAdmins) {
      return;
    }
    if (this.desde <0 ) {
      return;
    }
    this.pagina = (this.desde/10)+1;
    this.getAdmins();
  }

  getDataBuscar(data: string){

  }

  testCorreo(){
    let currentDate = new Date();
    let notificacion =new Notificacion(
      this.user._id,
      currentDate,
      "Prueba de correo",
      "Probando el servicio de correo con OAuth2 y Gmail",
      "Estudiante",
      "u20161146030@usco.edu.co"
    );
    this._notiService.sendNotificacionCorreo(notificacion).subscribe((resp:any) => {
      Swal.fire({
        title: 'Correo enviado!',
        icon: 'success',
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick:false,
        timer: 1000,
        timerProgressBar: true
      });
    });
  }
}
