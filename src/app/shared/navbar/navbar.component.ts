import { Component, OnInit } from '@angular/core';
import { LoginService, ProgramaService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

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
  programa: String;

  // Inyectamos el loginService para hacer el logOut directamente en el html
  constructor(
    public _loginService: LoginService,
    public _programaService: ProgramaService,
    public router: Router
  ) {}

  ngOnInit(): void {
    init_plugins();
    this.getPrograma();
    this.setInfo();
  }

  // Obtenemos el programa y lo pasamos a la variable Programa
  getPrograma() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      console.log(infoPrograma);
      this.programa = infoPrograma.nombre;
    });
  }

  // "Ponemos" el restod e información a las variables globales
  setInfo() {
    let estudiante = localStorage.getItem('estudiante');
    let administrativo = localStorage.getItem('administrativo');

    if (estudiante) {
      this.tipoUsuario = 'estudiante';
      this.info = JSON.parse(estudiante);
    } else {
      this.tipoUsuario = 'administrativo';
      this.info = JSON.parse(administrativo);
    }
  }

  // Función que direcciona cuando se da click en "perfil"
  irPerfil() {
    this.router.navigate(['/perfil']);
  }
}
