import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../../models/Empresa.model';
import { EncargadoEmpresa } from '../../../models/EncargadoEmpresa.model';
import { Convenio } from 'src/app/models/Convenio.model'
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/app/services/service.index';
import { EncargadoEmpresaService } from 'src/app/services/service.index';
import { ConvenioService } from 'src/app/services/service.index';
import {Router} from '@angular/router'

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  convenios: any[];
  programa: string;
  usuario = JSON.parse(localStorage.getItem("administrativo"));

  _id: String;
  nit: String;
  nombre: String;
  direccion: String;
  telefono: String;
  naturaleza: String;
  actividad_economica: String;
  nombre_persona: String;
  cedula: String;
  cargo_persona: String;
  correo_persona: String;
  telefono_persona: String;
  estado: String;

  documento_convenio = new FormData();
  nombreArchivoC:string;

  MAX_SIZE_FILE: number = 1000000

  constructor(public router: Router,
              public _empresaService: EmpresaService, 
              public _encargadoEmpresaService: EncargadoEmpresaService,
              public _convenioService: ConvenioService) { }

  ngOnInit(): void {
    if(this.usuario.rol === "JEFE_PROGRAMA"){
      this.getConveniosJefe();
    }else if (this.usuario.rol === "ADMIN"){
      this.getConvenios();
    }else{
      this.router.navigate(['/panel-principal']);
    }
  }

  getConveniosJefe() {
    let programa = this.usuario.programa._id
    this.programa = programa

    this._convenioService.getConveniosJefe(programa).subscribe((resp: any) => {
      this.convenios = resp.convenios;
    });
  }

  getConvenios() {
    
    let programa = this.usuario.programa._id
    this.programa = programa
    
    this._convenioService.getConvenios().subscribe((resp: any) => {
      this.convenios = resp.convenios;
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
            form.value.nit,
            form.value.nombre,
            form.value.direccion,
            form.value.telEmpresa,
            form.value.naturaleza,
            form.value.actividadEc,
          );

        this._empresaService.postEmpresa(empresa).subscribe((resp:any) => {

          console.log(resp);
          let encargadoEmpresa = new EncargadoEmpresa(
            form.value.cedula,
            form.value.persona,
            form.value.correo,
            form.value.telPersona,
            "123456",
            programa,
            resp._id,
            form.value.puesto,
            "EncargadoEmpresa",
          )
          this._encargadoEmpresaService.postEncargadoEmpresa(encargadoEmpresa).subscribe((respp:any) => {
            let convenio = new Convenio(programa,  resp._id, respp._id);
            this._convenioService.postConvenio(convenio).subscribe((anws:any) => {
              this._convenioService.postDocumentoConvenio(anws._id, this.documento_convenio).subscribe((ans:any) => {
                if(ans){
                  Swal.fire({
                    title: '¡Bien Hecho!',
                    text: `Se ha creado correctamente la empresa`,
                    icon: 'success'
                  }).then(() => {
                    if(this.usuario.rol === "JEFE_PROGRAMA"){
                      this.getConveniosJefe();
                    }else {
                      this.getConvenios();
                    }
                  });
                }
              });
            });
          });
        }); 
      }
    });
  }


  getDataPut(dato: any) {

    this._id = dato._id
    this.nombre = dato.empresa.nombre;
    this.direccion = dato.empresa.direccion;
    this.telefono = dato.empresa.telefono;
    this.naturaleza = dato.empresa.naturaleza;
    this.actividad_economica = dato.empresa.actividad_economica;
    this.nombre_persona = dato.persona_a_cargo.nombre;
    this.cargo_persona = dato.persona_a_cargo.cargo;
    this.correo_persona = dato.persona_a_cargo.correo;
    this.telefono_persona = dato.persona_a_cargo.telefono;
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

        let empresa = new Empresa(
          form.value.nit,
          form.value.nombre,
          form.value.direccion,
          form.value.telEmpresa,
          form.value.naturaleza,
          form.value.actividadEc,
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

  getFileConvenio(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        location.reload()
      });

    } else {

      this.nombreArchivoC = file.name;
      let documento_convenio = <File>file;
      this.documento_convenio.append('documento_propuesta', documento_convenio, documento_convenio.name);
    }
  }

  getDataBuscar(data) {

  }
}






