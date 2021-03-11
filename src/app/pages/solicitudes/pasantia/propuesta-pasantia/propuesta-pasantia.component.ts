import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pasantia } from 'src/app/models/Pasantia';
import { PasantiService } from 'src/app/services/service.index';

declare function init_plugins()

@Component({
  selector: 'app-acta-inicio',
  templateUrl: './propuesta-pasantia.component.html',
  styleUrls: ['./propuesta-pasantia.component.css']
})
export class ActaInicioComponent implements OnInit {

  pasantia: string;
  nombreArchivoP: string;
  nombreArchivoF: string;
  usuario:any;

  documento_propuesta = new FormData();
  documento_fichaAcademica = new FormData();

  MAX_SIZE_FILE: number = 2000000

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {

    init_plugins()
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.usuario = estudiante;
      this.pasantia = estudiante.modalidad;
    }else{
      this.usuario = admin;
      this.pasantia = admin.modalidad
    }
    console.log(this.nombreArchivoP);
  }

  getFilePropuesta(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 2 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        location.reload()
      });

    } else {

      this.nombreArchivoP = file.name;
      let documento_propuesta = <File>file;
      this.documento_propuesta.append('documento_propuesta', documento_propuesta, documento_propuesta.name);
    }
  }

  getFileFicha(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 2 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        location.reload()
      });

    } else {

      this.nombreArchivoF = file.name;
      let documento_fichaAcademica = <File>file;
      this.documento_fichaAcademica.append('documento_fichaAcademica', documento_fichaAcademica, documento_fichaAcademica.name);
    }
  }

  enviarPropuesta() {

    Swal.fire({
      title: '¿Enviar Propuesta de Pasantía?',
      html: `<p> Se enviará el documento al Jefe de Programa</p>`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        let idEstudiante = this.usuario._id;
        this._pasantiaService.postDocumentoPropuesta(idEstudiante, this.documento_propuesta).subscribe((resp:any) => {
          this._pasantiaService.postDocumentoFichaAcademica(idEstudiante, this.documento_fichaAcademica).subscribe();
        });

      }
    });
  }

}
