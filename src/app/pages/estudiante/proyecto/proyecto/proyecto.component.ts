import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProyectoService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyecto: any;
  info = JSON.parse(localStorage.getItem('user'));
  fileValid = false;
  documento_proyecto = new FormData();
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
    this._proyectoService.getProyecto().subscribe((resp: any) => {
      this.proyecto = resp.proyecto;
      if(this.proyecto.estado_proyecto && this.proyecto.estado_proyecto !== 'Ajustar'){
        this.router.navigate(["/"]);
      }
    })
  }

  getFilePropuesta(file: File) {
    const labelfileproyecto = document.getElementById("labelfileproyecto") as HTMLElement;
    if (file.size > this.MAX_SIZE_FILE) {
      this.documento_proyecto = new FormData();
      this.fileValid = false;
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        labelfileproyecto.setAttribute("style", "");
        labelfileproyecto.innerHTML = "Click para subir el archivo del anteproyecto"
      });
    } else {
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const extensionesValidas = ['pdf', 'PDF'];
  
      if (extensionesValidas.indexOf(extensionArchivo) >= 0) {
        this.fileValid = true;
        labelfileproyecto.setAttribute("style", "color: #8F141B; font-weight: bold;");
        labelfileproyecto.innerHTML = file.name;
        let documento_proyecto = <File>file;
        this.documento_proyecto.append('documento_proyecto', documento_proyecto, documento_proyecto.name);
      }else{
        this.documento_proyecto = new FormData();
        this.fileValid = false;
        Swal.fire({
          title: '¡Lo Sentimos!',
          html: `<p> El archivo deber ser en formato pdf</p>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          labelfileproyecto.setAttribute("style", "");
          labelfileproyecto.innerHTML = "Click para subir el archivo del anteproyecto"
        });
      }
    }
  }

  uploadProyecto(){
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
        this._proyectoService.uploadDocumento(this.proyecto._id, this.documento_proyecto).subscribe((resp:any)=>{
          if(resp){
            let currentDate = new Date();
            let notificacion = new Notificacion(
              this.proyecto.director._id,
              currentDate,
              'Envio del proyecto',
              `${this.info.nombres} ${this.info.apellidos}  te ha enviado el documento del proyecto`,
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
