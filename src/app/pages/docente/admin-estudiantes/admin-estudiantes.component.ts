import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstudianteService } from 'src/app/services/service.index';

@Component({
  selector: 'app-admin-estudiantes',
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['./admin-estudiantes.component.css']
})
export class AdminEstudiantesComponent implements OnInit {

  info:any;

  nombreArchivoEst: string;
  documento_Est = new FormData();
  MAX_SIZE_FILE: number = 1000000

  constructor(public _estudianteService:EstudianteService) { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('administrativo'));
  }

  getFileEst(file: File) {
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
      this.nombreArchivoEst = file.name;
      let documento_est= <File>file;
      this.documento_Est.append('documento_est', documento_est, documento_est.name);
    }
  }

  uploadEst(){
    this._estudianteService.postEstudiante(this.info.programa._id, this.documento_Est).subscribe((resp:any)=>{
      if(resp){
        Swal.fire({
          title: '¡Bien Hecho!',
          text: 'Estudiantes actuliazadas correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          confirmButtonText: 'Ok',
          showCancelButton: false,
          allowOutsideClick:false,
          allowEscapeKey:false,
          allowEnterKey:false,
          confirmButtonColor: '#60D89C',
        }).then((result) => {
          if(result.dismiss){
            this.clearModal();
            let btnClose = (document.getElementById('closeModal')) as HTMLElement;
            btnClose.click();
            location.reload();
          }
        });
      }
    });
  }

  clearModal(){
    this.nombreArchivoEst = null;
    this.documento_Est = new FormData();
  }

  getDataBuscar(data) {
    //later xd
  }

}
