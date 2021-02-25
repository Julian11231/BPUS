import { Component, OnInit } from '@angular/core';
import { LoginService, NotificacionesService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import {interval} from 'rxjs';
declare function init_plugins();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  // Obtenemos toda la información del usuario
  info: any;
  tipoUsuario: string;
  numeroNotificaciones: number;
  notificacionesNav:any;
  fecha: Date;

  // Inyectamos el loginService para hacer el logOut directamente en el html
  constructor(
    public _loginService: LoginService,
    public _notificacionService: NotificacionesService, 
    public router: Router
  ) {}

  ngOnInit(): void {
    init_plugins();
    this.setInfo();
    this.cargarNotificacionesNav();
    const contador = interval(60000);
    contador.subscribe((n) => {
      this.cargarNotificacionesNav();
    });
    
  }

  cargarNotificacionesNav():void {
    this._notificacionService.getNotificacionesNav(this.info._id).subscribe((resp:any) => {
      this.notificacionesNav = resp.notificaciones;
      this.numeroNotificaciones = this.notificacionesNav.length;
      const pipe = new DatePipe('en-US');
      let currentDate = new Date();
      for (let i = 0; i < this.numeroNotificaciones; i++) {
        let notiTime = new Date(Date.parse(this.notificacionesNav[i].fecha));
        let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(notiTime.getFullYear(), notiTime.getMonth(), notiTime.getDate()) ) /(1000 * 60 * 60 * 24));
        if(diff > 0){
          this.notificacionesNav[i].fecha = pipe.transform(this.notificacionesNav[i].fecha, 'dd/MM/yyyy');
        }else{
          this.notificacionesNav[i].fecha = pipe.transform(this.notificacionesNav[i].fecha, 'shortTime');
        }
      }
    });

  }

  // "Ponemos" el restod e información a las variables globales
  setInfo() {
    let estudiante = localStorage.getItem('estudiante');
    let administrativo = localStorage.getItem('administrativo');
    let encargadoEmpresa = localStorage.getItem('encargadoEmpresa');

    if (estudiante) {
      this.tipoUsuario = 'estudiante';
      this.info = JSON.parse(estudiante);
    } else if (administrativo){
      this.tipoUsuario = 'administrativo';
      this.info = JSON.parse(administrativo);
    }else{
      this.tipoUsuario = 'encargadoEmpresa';
      this.info = JSON.parse(encargadoEmpresa);
    }
  }

  // Función que direcciona cuando se da click en "perfil"
  irPerfil() {
    this.router.navigate(['/perfil']);
  }
}
