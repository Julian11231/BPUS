import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../../models/Empresa.model';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: any[];
  programa: string;

  _id: String;
  nombre: String;
  direccion: String;
  telefono: String;
  naturaleza: String;
  actividad_economica: String;
  nombre_persona: String;
  cargo_persona: String;
  correo_persona: String;
  telefono_persona: String;
  estado: String;

  constructor(public _empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {

    let administrativo: any = JSON.parse(localStorage.getItem("administrativo"));
    let programa = administrativo.programa._id
    this.programa = programa

    this._empresaService.getEmpresas().subscribe((resp: any) => {
      this.empresas = resp.empresas

    });
  }



  postEmpresa(form: NgForm) {
    Swal.fire({
      title: '¿Guardar Empresa?',
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

        let empresa = new Empresa(
          programa,
          form.value.nombre,
          form.value.direccion,
          form.value.telEmpresa,
          form.value.naturaleza,
          form.value.actividadEc,
          form.value.persona,
          form.value.puesto,
          form.value.correo,
          form.value.telPersona
        );

        this._empresaService.postEmpresa(empresa).subscribe();
      }
    })

  }


  getDataPut(dato: any) {

    this._id = dato._id
    this.nombre = dato.nombre;
    this.direccion = dato.direccion;
    this.telefono = dato.telefono;
    this.naturaleza = dato.naturaleza;
    this.actividad_economica = dato.actividad_economica;
    this.nombre_persona = dato.nombre_persona;
    this.cargo_persona = dato.cargo_persona;
    this.correo_persona = dato.correo_persona;
    this.telefono_persona = dato.telefono_persona;
    this.estado = dato.estado;

  }

  putEmpresa(form: NgForm) {
    Swal.fire({
      title: '¿Actualizar Empresa?',
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

        let empresa = new Empresa(
          programa,
          form.value.nombre,
          form.value.direccion,
          form.value.telEmpresa,
          form.value.naturaleza,
          form.value.actividadEc,
          form.value.persona,
          form.value.puesto,
          form.value.correo,
          form.value.telPersona,
          form.value.estado
        );

        this._empresaService.putEmpresa(this._id, empresa).subscribe(resp => console.log(resp));
      }
    })
  }

  deleteEmpresa(dato: any) {

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
        this._empresaService.deleteEmpresa(dato._id).subscribe();
      }
    })
  }

  getDataBuscar(data) {

  }
}






