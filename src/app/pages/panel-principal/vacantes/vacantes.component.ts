import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { VacantesService, EmpresaService } from 'src/app/services/service.index';
import { Vacante } from '../../../models/Vacante';



@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  vacantes: any[];
  empresas: any[];

  programa: string;

  _id: String;
  titulo: String;
  funciones: String;
  descripcion: String;
  empresaSelcted: any;
  ubicacion: String;
  modalidad: String;
  cantidad: Number;
  pagada: String;
  estado: String;

  constructor(public _vacantesService: VacantesService, public _empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getVacantes();
  }

  getDataBuscar(data) {

  }

  getVacantes() {

    let administrativo: any = JSON.parse(localStorage.getItem("administrativo"));
    let programa = administrativo.programa._id
    this.programa = programa;

    this._vacantesService.getVacantes().subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });

    this._empresaService.getEmpresas().subscribe((resp: any) => {
      this.empresas = resp.empresas;
    });
  }



  postVacante(form: NgForm) {
    Swal.fire({
      title: '¿Guardar Vacante?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        let administrativo: any = JSON.parse(localStorage.getItem("administrativo"));
        let programa = administrativo.programa._id

        let vacante = new Vacante(
          form.value.titulo,
          form.value.funciones,
          form.value.descripcion,
          form.value.empresa,
          programa,
          form.value.ubicacion,
          form.value.modalidad,
          form.value.cantidad,
          form.value.pagada
        );

        this._vacantesService.postVacantes(vacante).subscribe();
      }
    })

  }


  getDataPut(dato: any) {

    this._id = dato._id
    this.titulo = dato.titulo;
    this.funciones = dato.funciones;
    this.descripcion = dato.descripcion;
    this.empresaSelcted = dato.empresa.nombre;
    this.ubicacion = dato.ubicacion;
    this.modalidad = dato.modalidad;
    this.cantidad = dato.cantidad;
    this.pagada = dato.pagada;
    this.estado = dato.estado;

    console.log(this.empresaSelcted);

  }

  putVacante(form: NgForm) {
    Swal.fire({
      title: '¿Actualizar Vacante?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        let administrativo: any = JSON.parse(localStorage.getItem("administrativo"));
        let programa = administrativo.programa._id

        let vacante = new Vacante(
          form.value.titulo,
          form.value.funciones,
          form.value.descripcion,
          form.value.empresa,
          programa,
          form.value.ubicacion,
          form.value.modalidad,
          form.value.cantidad,
          form.value.pagada,
          form.value.estado
        );

        this._vacantesService.putVacante(this._id, vacante).subscribe();
      }
    })
  }

  deleteVacante(dato: any) {

    Swal.fire({
      title: '¿Eliminar Empresa?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {
        this._vacantesService.eliminarVacante(dato._id).subscribe();
      }
    })
  }



}
