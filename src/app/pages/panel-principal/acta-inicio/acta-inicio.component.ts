import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  propuestaPasantia = new FormData();

  MAX_SIZE_FILE: number = 25000000

  constructor() { }

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
      let filePropuesta = <File>file;
      this.propuestaPasantia.append('documento_propuesta', filePropuesta, filePropuesta.name);

    }
  }

  getFileConvenio(file: File) {
    this.nombreArchivoC = file.name;
  }


  enviarActa() {
  }

}
