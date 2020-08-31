import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pasantia } from '../../../models/Pasantia';

@Component({
  selector: 'app-mi-solicitud',
  templateUrl: './mi-solicitud.component.html',
  styleUrls: ['./mi-solicitud.component.css']
})
export class MiSolicitudComponent implements OnInit {

  pasantiaSup: Pasantia;

  info: any;
  pasantia: any;
  programa: string;

  _id: string;
  estado: string;
  notas: string;

  documento_propuesta: string;
  estado_propuesta: string;

  letra: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  funciones: string;

  nombreEst: string;
  apellidoEst: string;
  codigoEst: string;
  idEst: string;
  correoEst: string;
  telefonoEst: string;

  personaCargo: string;
  correo: string;
  telefono: string;

  preInscripcion: any;
  nombreEmpresa: string;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem("estudiante"));
    this.getPasantia();
  }


  getPasantia() {

    let estudiante = JSON.parse(localStorage.getItem("estudiante"));
    this._id = estudiante.modalidad._id;

    this._pasantiaService.getPasantia(this._id).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
    });

  }

  getDataInfo(data: any) {

    this.pasantiaSup = data;
    console.log(this.pasantiaSup)

    this._id = data._id;
    this.estado = data.estado
    this.notas = data.notas;

    this.documento_propuesta = data.documento_propuesta;
    this.estado_propuesta

    this.letra = data.vacante.letra;
    this.titulo = data.vacante.titulo;
    this.empresa = data.empresa.nombre;
    this.ubicacion = data.vacante.ubicacion;
    this.modalidad = data.vacante.modalidad;
    this.funciones = data.vacante.funciones;

    this.nombreEst = data.estudiante.nombres;
    this.apellidoEst = data.estudiante.apellidos;
    this.codigoEst = data.estudiante.codigo;
    this.idEst = data.estudiante.identificacion;
    this.correoEst = data.estudiante.correo;
    this.telefonoEst = data.estudiante.telefono;

    this.personaCargo = data.empresa.nombre_persona;
    this.correo = data.empresa.correo_persona;
    this.telefono = data.empresa.telefono_persona;
  }


}
