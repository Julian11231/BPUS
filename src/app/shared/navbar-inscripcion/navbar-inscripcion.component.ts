import { Component, OnInit } from '@angular/core';
import { LoginService, ProgramaService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-navbar-inscripcion',
  templateUrl: './navbar-inscripcion.component.html',
  styleUrls: ['./navbar-inscripcion.component.css']
})
export class NavbarInscripcionComponent implements OnInit {

  // Obtenemos toda la información del usuario
  info: any;
  tipoUsuario: string;
  programa: String;

  // Inyectamos el loginService para hacer el logOut directamente en el html
  constructor(
    public _loginService: LoginService,
    public _programaService: ProgramaService,
    public router: Router
  ) { }

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
