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
  }

  // Función que pasamos el la información del estudiante y el tipo de usuario
  setInfo() {
    // Obtenemos información del estudiante y el administrativo
    let estudiante = localStorage.getItem('estudiante');
    let administrativo = localStorage.getItem('administrativo');
    let encargadoEmpresa = localStorage.getItem('encargadoEmpresa');

    // Si existe el estudiante...
    if (estudiante) {
      this.tipoUsuario = 'estudiante';
      this.info = JSON.parse(estudiante);
    } else if(administrativo) {
      this.tipoUsuario = 'administrativo';
      this.info = JSON.parse(administrativo);
    } else{
      this.tipoUsuario = 'encargadoEmpresa';
      this.info = JSON.parse(encargadoEmpresa);
    }
  }
}
