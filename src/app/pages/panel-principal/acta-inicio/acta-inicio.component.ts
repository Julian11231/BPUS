import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pasantia } from '../../../models/Pasantia';
import { PasantiService } from 'src/app/services/service.index';

declare function init_plugins()

@Component({
  selector: 'app-acta-inicio',
  templateUrl: './acta-inicio.component.html',
  styleUrls: ['./acta-inicio.component.css']
})
export class ActaInicioComponent implements OnInit {

  pasantia: string;
  nombreArchivoP: string;
  nombreArchivoC: string;

  documento_propuesta = new FormData();

  MAX_SIZE_FILE: number = 25000000

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {

    init_plugins()
    this.pasantia = JSON.parse(localStorage.getItem('estudiante')).modalidad

  }

  getFilePropuesta(file: File) {

    if (file.size > this.MAX_SIZE_FILE) {
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera las 25 MB</p>`,
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

  getFileConvenio(file: File) {
    this.nombreArchivoC = file.name;
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

        let idEstudiante = JSON.parse(localStorage.getItem('estudiante'))._id;
        this._pasantiaService.postDocumentoPropuesta(idEstudiante, this.documento_propuesta).subscribe();

      }
    });
  }

}
