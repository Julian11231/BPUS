import { Component, OnInit } from '@angular/core';
import { PasantiService, TutoresService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiaAdmin } from 'src/app/models/PasantiaAdmin';
import { Pasantia } from '../../../models/Pasantia';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  pasantiaSup: Pasantia;

  info: any;
  propuestas: any[];
  programa: string;

  _id: string;
  estado: string;
  notas: string;

  tutorNombres: string;
  tutorApellidos: string;
  estado_propuesta: string;
  notas_propuesta: string;

  letra: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  funciones: string;

  idEstudiante: string;
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

  tutores: any[] = [];

  constructor(public _pasantiaService: PasantiService, public _tutoresService: TutoresService) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
    }else{
      this.info = admin;
    }
    this.getPropuestas();
    this.getTutores();

  }

  putSolicitud(form: NgForm) {

    Swal.fire({
      title: '¿Actualizar Propuesta?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        let pasantia = new Pasantia(null, null, null, form.value.tutor, null, form.value.estado_propuesta, form.value.notas_propuesta, null, null,
          null, null, null, null, null, null, null, null, "Aprobada")
        this._pasantiaService.putSolicitud(this._id, pasantia).subscribe();
      }
    })

  }


  getPropuestas() {

    this.programa = this.info.administrativo.programa._id;

    this._pasantiaService.getSolicitudes().subscribe((resp: any) => {
      this.propuestas = resp.pasantias;
      console.log(resp);

    });
  }

  getDataInfo(data: any) {

    this.pasantiaSup = data;

    this._id = data._id;
    this.estado = data.estado
    this.notas = data.notas;

    if (!data?.tutor) {
      this.tutorNombres = null;
      this.tutorApellidos = null;

    } else {
      this.tutorNombres = data.tutor.nombres;
      this.tutorApellidos = data.tutor.apellidos;
    }
    this.notas_propuesta = data.notas_propuesta;
    this.estado_propuesta = data.estado_propuesta;

    this.letra = data.vacante.letra;
    this.titulo = data.vacante.titulo;
    this.empresa = data.empresa.nombre;
    this.ubicacion = data.vacante.ubicacion;
    this.modalidad = data.vacante.modalidad;
    this.funciones = data.vacante.funciones;

    this.idEstudiante = data.estudiante._id;
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

  getTutores() {
    let idPrograma = this.info.programa._id;
    this._tutoresService.getTutores(idPrograma).subscribe((resp: any) => {
      this.tutores = resp.admins;
    });
  }


  getDataBuscar(data) {

  }

}
