import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../../models/Empresa.model';
import { EncargadoEmpresa } from '../../../models/EncargadoEmpresa.model';
import { Convenio } from 'src/app/models/Convenio.model';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/app/services/service.index';
import { EncargadoEmpresaService, ConvenioService } from 'src/app/services/service.index';
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

  _id: string;
  convienioId: string;
  nit: String;
  nombre: String;
  ciudad:String;
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
  rutapdf: string;

  documento_convenio = new FormData();
  nombreArchivoC:string;

  documento_convenioUpdate = new FormData();
  nombreArchivoCUpdate:string;
  
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
            form.value.ciudad,
            form.value.direccion,
            form.value.telEmpresa,
            form.value.naturaleza,
            form.value.actividadEc,
          );

        this._empresaService.postEmpresa(empresa).subscribe((resp:any) => {
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
              if(typeof(this.nombreArchivoC) !== 'undefined'){
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
              }else{
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
      }
    });
  }


  getDataPut(dato: any) {
    this.convienioId = dato._id;
    this._id = dato.empresa._id
    this.nit = dato.empresa.nit
    this.nombre = dato.empresa.nombre;
    this.ciudad = dato.empresa.ciudad
    this.direccion = dato.empresa.direccion;
    this.telefono = dato.empresa.telefono;
    this.naturaleza = dato.empresa.naturaleza;
    this.actividad_economica = dato.empresa.actividad_economica;
    this.nombre_persona = dato.encargado.nombre;
    this.cargo_persona = dato.encargado.cargo;
    this.correo_persona = dato.encargado.correo;
    this.telefono_persona = dato.encargado.telefono;
    this.rutapdf = dato.rutapdf;
    this.estado = dato.empresa.estado;

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
          this.nit,
          form.value.nombre,
          form.value.ciudad,
          form.value.direccion,
          form.value.telEmpresa,
          form.value.naturaleza,
          form.value.actividadEc,
          form.value.estado
        );

        this._empresaService.putEmpresa(this._id, empresa).subscribe((resp:any) => {
          if(typeof(this.nombreArchivoCUpdate) !== 'undefined'){
            this._convenioService.postDocumentoConvenio(this.convienioId, this.documento_convenioUpdate).subscribe((respp:any) => {
              if(respp){
                Swal.fire({
                  title: '¡Bien Hecho!',
                  text: `Se ha actualizado correctamente la empresa`,
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
          }else{
            Swal.fire({
              title: '¡Bien Hecho!',
              text: `Se ha actualizado correctamente la empresa`,
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
      }
    })
  }

  putEncargado(dato: any) {

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
      this.documento_convenio.append('documento_convenio', documento_convenio, documento_convenio.name);
    }
  }

  getFileConvenioUpdate(file: File) {

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

      this.nombreArchivoCUpdate = file.name;
      console.log(this.nombreArchivoCUpdate );
      let documento_convenio = <File>file;
      this.documento_convenioUpdate.append('documento_convenio', documento_convenio, documento_convenio.name);
    }
  }

  clearDocumentoUpdate(){
    this.nombreArchivoCUpdate = undefined;
    this.documento_convenioUpdate = new FormData();
    var fileUpdate = (document.getElementById("nombreArchivoCUpdate")) as HTMLInputElement;
    console.log(fileUpdate.value);
    fileUpdate.value = "";
    console.log(fileUpdate.value);
  }

  getDataBuscar(data) {

  }
}








