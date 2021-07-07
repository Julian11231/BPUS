import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  // Creamos variables globales
  tipoUsuario: string;
  usuario = JSON.parse(localStorage.getItem('user'));
  programa: any;

  // Inyectamos el servicio
  constructor(public _programaService: ProgramaService) {}

  ngOnInit() {
    this.getProgramaInfo();
  }

  getProgramaInfo() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma;
    });
  }

}
