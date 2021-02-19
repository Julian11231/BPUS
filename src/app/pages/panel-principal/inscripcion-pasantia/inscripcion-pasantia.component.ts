import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VacantesService, PasantiService } from 'src/app/services/service.index';
import { Pasantia } from '../../../models/Pasantia';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscripcion-pasantia',
  templateUrl: './inscripcion-pasantia.component.html',
  styleUrls: ['./inscripcion-pasantia.component.css']
})
export class InscripcionPasantiaComponent implements OnInit {

  info: any;
  vacantes: any[];

  letra: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  funciones: string;
  descripcion: string;
  cantidad: number;
  pagada: string;
  personaCargo: string;
  correo: string;
  telefono: string;

  preInscripcion: any;
  nombreEmpresa: string;

  constructor(public _vacantesService: VacantesService, public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
      this.getVacantesEstudiante();
    }else{
      this.info = admin;
      this.getVacantes();
    }
    
  }

  postSolicitud(form: NgForm) {

    let idEstudiante = this.info._id;

    Swal.fire({
      title: '¿Hacer Pre-Incripición?',
      text: `Usted realizaría la pasatía en la empresa:  ${this.nombreEmpresa}`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        setTimeout(() => {

          let preInscripcion = new Pasantia(
            this.empresa,
            this.preInscripcion,
            form.value.eps
          )
          this._pasantiaService.postSolicitud(idEstudiante, preInscripcion).subscribe();

        }, 100);

      }
    })
  }

  getVacantes() {
    this._vacantesService.getVacantes().subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });
  }

  getVacantesEstudiante() {
    this._vacantesService.getVacantesEstudiante(this.info.programa).subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });
  }

  getDataInfo(data: any) {

    this.letra = data.letra;
    this.titulo = data.titulo;
    this.empresa = data.empresa.nombre;
    this.ubicacion = data.ubicacion;
    this.modalidad = data.modalidad;
    this.funciones = data.funciones;
    this.descripcion = data.descripcion;
    this.cantidad = data.cantidad;
    this.pagada = data.pagada;
    this.personaCargo = data.empresa.nombre_persona;
    this.correo = data.empresa.correo_persona;
    this.telefono = data.empresa.telefono_persona;
  }

  getVacanteSelected(dato: any) {
    this.preInscripcion = dato._id;
    this.empresa = dato.empresa._id;
    this.nombreEmpresa = dato.empresa.nombre;
  }

}
