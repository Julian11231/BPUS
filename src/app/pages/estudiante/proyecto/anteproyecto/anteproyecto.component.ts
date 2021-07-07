import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProyectoService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.component.html',
  styleUrls: ['./anteproyecto.component.css']
})
export class AnteproyectoComponent implements OnInit {

  proyecto: any;
  info = JSON.parse(localStorage.getItem('user'));
  fileValid = false;
  documento_anteProyecto = new FormData();
  MAX_SIZE_FILE: number = 1000000;

  constructor(public _proyectoService: ProyectoService, 
              public _notificacionService: NotificacionesService,
              public router: Router) { }

  ngOnInit(): void {
    if(this.info.modalidad !== null){
      this.getProyecto();
    }else{
      this.router.navigate(["/"])
    }
  }

  getProyecto() {
    this._proyectoService.getProyecto(this.info.modalidad).subscribe((resp: any) => {
      this.proyecto = resp.proyecto;
    })
  }

  getFilePropuesta(file: File) {
    const labelfileanteproyecto = document.getElementById("labelfileanteproyecto") as HTMLElement;
    if (file.size > this.MAX_SIZE_FILE) {
      this.documento_anteProyecto = new FormData();
      this.fileValid = false;
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        labelfileanteproyecto.setAttribute("style", "");
        labelfileanteproyecto.innerHTML = "Click para subir el archivo del anteproyecto"
      });
    } else {
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const extensionesValidas = ['pdf', 'PDF'];
  
      if (extensionesValidas.indexOf(extensionArchivo) >= 0) {
        this.fileValid = true;
        labelfileanteproyecto.setAttribute("style", "color: #8F141B; font-weight: bold;");
        labelfileanteproyecto.innerHTML = file.name;
        let documento_anteProyecto = <File>file;
        this.documento_anteProyecto.append('documento_anteproyecto', documento_anteProyecto, documento_anteProyecto.name);
      }else{
        this.documento_anteProyecto = new FormData();
        this.fileValid = false;
        Swal.fire({
          title: '¡Lo Sentimos!',
          html: `<p> El archivo deber ser en formato pdf</p>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          labelfileanteproyecto.setAttribute("style", "");
          labelfileanteproyecto.innerHTML = "Click para subir el archivo del anteproyecto"
        });
      }
    }
  }

  uploadAnteproyecto(){
    Swal.fire({
      title: '¿Enviar documento?',
      icon: 'question',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this._proyectoService.uploadDocumento(this.proyecto._id, this.documento_anteProyecto).subscribe((resp:any)=>{
          if(resp){
            let currentDate = new Date();
            let notificacion = new Notificacion(
              this.proyecto.director._id,
              currentDate,
              'Envio del ante-proyecto',
              `${this.info.nombres} ${this.info.apellidos} te ha enviado el anteproyecto`,
              'Administrativo',
              this.proyecto.director.correo
            );
            this._notificacionService.postNotificacion(notificacion).subscribe();
            Swal.fire({
              title: '¡Bien Hecho!',
              text: `Se ha enviado correctamente el documento`,
              icon: 'success',
              showCloseButton: false,
              showConfirmButton: false,
              showCancelButton: false,
              allowEnterKey: false,
              allowOutsideClick:false,
              allowEscapeKey: false,
              timer: 1000,
              timerProgressBar: true
            }).then((result) => {
              if(result.value || result.dismiss){
                location.reload()
              }else{
                location.reload()
              }
            });
          }
        });
      }
    });
  }

}
