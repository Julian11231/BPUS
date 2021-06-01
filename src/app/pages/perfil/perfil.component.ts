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
  info = JSON.parse(localStorage.getItem('user'));
  programa: String;

  // Inyectamos el servicio
  constructor(public _programaService: ProgramaService) {}

  ngOnInit() {}

}
