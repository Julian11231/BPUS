import { Component, OnInit } from '@angular/core';
import { ProyectoService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-proyecto',
  templateUrl: './inscripcion-proyecto.component.html',
  styleUrls: ['./inscripcion-proyecto.component.css']
})
export class InscripcionProyectoComponent implements OnInit {

  info = JSON.parse(localStorage.getItem('user'));
  jefe:any;
  proyecto:any;
  inscripcionValid = false;
  documento_fichaAcademica = new FormData();
  documento_inscripcion = new FormData();
  MAX_SIZE_FILE: number = 1000000;

  constructor(private _proyectoService: ProyectoService, 
    private _notificacionService: NotificacionesService,
    private _programaService: ProgramaService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.info.modalidad !== null){
      this.getProyecto();
      this.getProgramaInfo()
    }else{
      this.router.navigate(["/login"]);
    }
  }

  getProgramaInfo() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.jefe = infoPrograma.jefe;
    });
  }

  getProyecto() {
    this._proyectoService.getProyecto().subscribe((resp: any) => {
      this.proyecto = resp.proyecto;
      if(this.proyecto.estado_inscripcion !== 'Ajustar'){
        this.router.navigate(["/"]);
      }
    })
  }

  getFileInscripcion(file: File) {
    if (file.size > this.MAX_SIZE_FILE) {
      const fileInscripcion = document.getElementById("fileInscripcion") as HTMLInputElement;
      const labelInscripcion = document.getElementById("labelInscripcion") as HTMLInputElement;
      this.documento_inscripcion = new FormData();
      this.inscripcionValid = false;
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        fileInscripcion.value = "";
        labelInscripcion.innerHTML = "Click aquí para subir el documento de Inscripción";
        labelInscripcion.setAttribute("style","");
      });
    } else {
      const labelInscripcion = document.getElementById("labelInscripcion") as HTMLInputElement;
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const extensionesValidas = ['pdf', 'PDF'];
  
      if (extensionesValidas.indexOf(extensionArchivo) >= 0) {
        this.inscripcionValid = true;
        labelInscripcion.setAttribute("style", "color: #8F141B; font-weight: bold;");
        labelInscripcion.innerHTML = file.name;
        let documento_inscripcion = <File>file;
        this.documento_inscripcion.append('documento_inscripcion', documento_inscripcion, documento_inscripcion.name);
      }else{
        this.documento_inscripcion = new FormData();
        this.inscripcionValid = false;
        Swal.fire({
          title: '¡Lo Sentimos!',
          html: `<p> El archivo deber ser en formato pdf</p>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          labelInscripcion.setAttribute("style", "");
          labelInscripcion.innerHTML = "Click aquí para subir el documento de Inscripción";
        });
      }
    }
  }

  uploadInscripcion(){
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
        this._proyectoService.uploadDocumento(this.proyecto._id, this.documento_inscripcion).subscribe(async(resp:any)=>{
          if(resp){
            let currentDate = new Date();
            if(this.proyecto.estado === "Ajustar"){
              let currentDate = new Date();
              let estudiante = this.proyecto.estudiante.nombres+" "+this.proyecto.estudiante.apellidos;
              let txt = "ha";
              if(this.proyecto.estudiante2 && !this.proyecto.estudiante3){
                txt = "han";
                estudiante = estudiante+" y "+this.proyecto.estudiante2.nombres+" "+this.proyecto.estudiante2.apellidos;
              }else if(this.proyecto.estudiante2 && this.proyecto.estudiante3){
                estudiante = estudiante+", "+this.proyecto.estudiante2.nombres+" "+this.proyecto.estudiante2.apellidos;
              }
              if(this.proyecto.estudiante3){
                estudiante = estudiante+" y "+this.proyecto.estudiante3.nombres+" "+this.proyecto.estudiante3.apellidos
              }
              let notificacion = new Notificacion(
                this.jefe._id,
                currentDate,
                'Nueva solicitd de proyecto de grado',
                `${estudiante} te ${txt} enviado una solicitud de proyecto de grado`,
                'Administrativo',
                this.jefe.correo);
                await this._notificacionService.postNotificacion(notificacion).toPromise();
                await this._notificacionService.sendNotificacionCorreo(notificacion).toPromise();
            }else{
              let notificacion = new Notificacion(
                this.proyecto.director._id,
                currentDate,
                'Envio de la inscripción actualizada',
                `${this.info.nombres} ${this.info.apellidos} te ha enviado el documento de la inscripción actualizada`,
                'Administrativo',
                this.proyecto.director.correo
              );
              await this._notificacionService.postNotificacion(notificacion).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notificacion).toPromise();
            }
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
                location.reload();
              }else{
                location.reload();
              }
            });
          }
        });
      }
    });
  }

}
