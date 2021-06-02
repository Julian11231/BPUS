import { Component, OnInit } from '@angular/core';
import { LoginService, ProgramaService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-inscripcion',
  templateUrl: './navbar-inscripcion.component.html',
  styleUrls: ['./navbar-inscripcion.component.css']
})
export class NavbarInscripcionComponent implements OnInit {

  // Obtenemos toda la información del usuario
  info = JSON.parse(localStorage.getItem('user'));
  tipoUsuario: string;
  programa: String;

  // Inyectamos el loginService para hacer el logOut directamente en el html
  constructor(
    public _loginService: LoginService,
    public _programaService: ProgramaService,
    public router: Router
  ) { }

  ngOnInit(): void {;
    this.getPrograma();
  }

  // Obtenemos el programa y lo pasamos a la variable Programa
  getPrograma() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma.nombre;
    });
  }

  // Función que direcciona cuando se da click en "perfil"
  irPerfil() {
    this.router.navigate(['/perfil']);
  }

}
