import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { VacantesService, EmpresaService } from 'src/app/services/service.index';
import { Vacante } from '../../../models/Vacante';
import { Router } from '@angular/router';



@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  vacantes: any[];
  empresa: any;
  encargado = JSON.parse(localStorage.getItem("encargadoEmpresa"));
  admin = JSON.parse(localStorage.getItem("administrativo"));
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

  constructor(public router: Router, public _vacantesService: VacantesService) { }

  ngOnInit(): void {
    if(this.admin && this.admin.rol === "ADMIN"){
      this.getVacantes();
    }else if(this.encargado){
      this.getVacantesEncargado();
    }else{
      this.router.navigate(['/panel-principal']);
    }
    
  }

  getDataBuscar(data) {

  }

  getVacantesEncargado() {
    this._vacantesService.getVacantesEncargado(this.encargado._id).subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });    
  }

  getVacantes() {
    this._vacantesService.getVacantes().subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
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

        let vacante = new Vacante(
          form.value.titulo,
          form.value.funciones,
          form.value.descripcion,
          this.encargado.empresa._id,
          this.encargado.programa._id,
          this.encargado._id,
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

        let vacante = new Vacante(
          form.value.titulo,
          form.value.funciones,
          form.value.descripcion,
          this.encargado.empresa._id,
          this.encargado.programa._id,
          this.encargado._id,
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
