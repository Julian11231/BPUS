import { Component, OnInit } from '@angular/core';
import { LoginService, NotificacionesService } from 'src/app/services/service.index';
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
  info = JSON.parse(localStorage.getItem('user'));
  numeroNotificaciones: number;

  // Inyectamos el loginService para hacer el logOut directamente en el html
  constructor(
    public _loginService: LoginService,
    public _notificacionService: NotificacionesService, 
    public router: Router
  ) {}

  ngOnInit(): void {
    init_plugins();
    this.cargarNotificacionesNav();
    const contador = interval(60000);
    contador.subscribe((n) => {
      this.cargarNotificacionesNav();
    });
    
  }

  cargarNotificacionesNav():void {
    this._notificacionService.getNotificacionesNav(this.info._id).subscribe((resp:any) => {
      this.numeroNotificaciones = resp.notificaciones.length;
    });
  }

  // Función que direcciona cuando se da click en "perfil"
  irPerfil() {
    this.router.navigate(['/perfil']);
  }
}
