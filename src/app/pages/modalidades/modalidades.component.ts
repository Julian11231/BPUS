import { Component, OnInit } from '@angular/core';
import {
  RequisitosService,
  ModalidadService,
  ProgramaService,
} from 'src/app/services/service.index';
import { Modalidad } from 'src/app/models/modalidad.model';

declare function init_plugins();

@Component({
  selector: 'app-modalidades',
  templateUrl: './modalidades.component.html',
  styleUrls: ['./modalidades.component.css'],
})
export class ModalidadesComponent implements OnInit {
  info: any; // Almacenará la info del estudiante (en JSON)
  modalidades: any[] = []; // Lista que almacenará la información de las modalidades
  porcentajeAprobado: Number; // Porcentaje de créditos aprobados del estudiante

  // Obtenemos los elementos que vamos a desactivar si el estudiante no cumple con el porcentaje
  btnSeleccionar: any = document.getElementsByClassName('btn');
  cardHeader: any = document.getElementsByClassName('card-header');

  // Inyectamos los servicios
  constructor(
    public _requisitoService: RequisitosService,
    public _modalidadesService: ModalidadService,
    public _programaService: ProgramaService
  ) {}

  ngOnInit(): void {
    init_plugins();

    // Pasamos el porcentaje calculado en el servicio de la modalidad al la variable "porcentajeAprobado"
    this.porcentajeAprobado = this._modalidadesService.porcentaje;

    // Obtenemos la información del estudiante y se la pasamos a la variable info
    let estudiante = JSON.parse(localStorage.getItem('estudiante'));
    let administrativo = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
    }else if(administrativo.rol === "ADMIN"){
      this.info = administrativo;
    }
    this.info = estudiante;

    this.getModalidades();

    // Enviamos los elemntos que queremos al servicio de la modalidad
    this._modalidadesService.seleccionarModalidad(
      this.btnSeleccionar,
      this.cardHeader
    );
  }

  // Función que nos permite obtener la información de las modalidades
  getModalidades() {
    this._modalidadesService.getModalidades().subscribe((resp: any) => {
      this.modalidades = resp.modalidades;
    });
  }
}
