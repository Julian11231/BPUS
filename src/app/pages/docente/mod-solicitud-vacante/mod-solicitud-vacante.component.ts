import { Component, OnInit } from '@angular/core';
import { PasantiService, TutoresService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiaAdmin } from '../../../models/PasantiaAdmin';
import { Pasantia } from 'src/app/models/Pasantia';


@Component({
  selector: 'app-mod-solicitud-vacante',
  templateUrl: './mod-solicitud-vacante.component.html',
  styleUrls: ['./mod-solicitud-vacante.component.css']
})
export class ModSolicitudVacanteComponent implements OnInit {

  info: any;
  solicitudes: any[];
  programa: string;

  _id: string;
  estado: string;
  notas: string;
  tutor: string[];

  letra: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  funciones: string;
  pagada: string;
  descripcion: string;

  nombreEst: string;
  apellidoEst: string;
  codigoEst: string;
  idEst: string;
  correoEst: string;
  telefonoEst: string;
  epsEst:string;

  personaCargo: string;
  correo: string;
  telefono: string;

  preInscripcion: any;
  nombreEmpresa: string;

  tutores: any[] = [];

  constructor(public _pasantiaService: PasantiService, public _tutoresService: TutoresService) { }

  ngOnInit(): void {
    //const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    this.info = admin;
    this.programa = this.info.programa._id;
    this.getSolicitudes();
    this.getTutores();

  }

  getTutores(){
    this._tutoresService.getTutores(this.programa).subscribe((resp:any)=>{
      this.tutores = resp.admins;
    });
  }

  aprobarSolicitud(form: NgForm) {
    console.log(form.value);
    let pasantia = new PasantiaAdmin(
      form.value.notas,
      "Aprobada",
      form.value.tutor
    )
    this._pasantiaService.putSolicitud(this._id, pasantia).subscribe();
  }

  rechazarSolicitud(form: NgForm){
    if(form.value.notas !== null){
      let pasantia = new PasantiaAdmin(
        form.value.notas,
        "Rechazada",
      )
      this._pasantiaService.putSolicitud(this._id, pasantia).subscribe();
    }
  }

  getSolicitudes() {

    this._pasantiaService.getSolicitudes().subscribe((resp: any) => {
      this.solicitudes = resp.pasantias;
    });
  }

  getDataInfo(data: any) {

    console.log(data)

    this._id = data._id;
    this.estado = data.estado
    this.notas = data.notas;
    //this.tutor = [data.tutor.nombres, data.tutor.apellidos];

    this.letra = data.vacante.letra;
    this.titulo = data.vacante.titulo;
    this.empresa = data.empresa.nombre;
    this.ubicacion = data.vacante.ubicacion;
    this.modalidad = data.vacante.modalidad;
    this.funciones = data.vacante.funciones;
    this.pagada = data.vacante.pagada;
    this.descripcion = data.vacante.descripcion;

    this.nombreEst = data.estudiante.nombres;
    this.apellidoEst = data.estudiante.apellidos;
    this.codigoEst = data.estudiante.codigo;
    this.idEst = data.estudiante.identificacion;
    this.correoEst = data.estudiante.correo;
    this.telefonoEst = data.estudiante.telefono;
    this.epsEst = data.estudiante.eps;

    this.personaCargo = data.vacante.encargado.nombre;
    this.correo = data.vacante.encargado.correo;
    this.telefono = data.vacante.encargado.telefono;
  }



  getDataBuscar(data) {

  }

}
