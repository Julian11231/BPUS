import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  // Creamos variables globales
  tipoUsuario: string;
  info: any;
  programa: String;

  // Inyectamos el servicio
  constructor(public _programaService: ProgramaService) {}

  ngOnInit() {
    init_plugins();
    this.setInfo();
    this.getPrograma();
  }

  // Obtenos el programa y se lo pasamos a la variable global
  getPrograma() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma.nombre;
    });
  }

  // Función que pasamos el la información del estudiante y el tipo de usuario
  setInfo() {
    // Obtenemos información del estudiante y el administrativo
    let estudiante = localStorage.getItem('estudiante');
    let administrativo = localStorage.getItem('administrativo');

    // Si existe el estudiante...
    if (estudiante) {
      this.tipoUsuario = 'estudiante';
      this.info = JSON.parse(estudiante);
    } else {
      this.tipoUsuario = 'administrativo';
      this.info = JSON.parse(administrativo);
    }
  }
}
