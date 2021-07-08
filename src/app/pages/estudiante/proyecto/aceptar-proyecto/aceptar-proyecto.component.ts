import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProyectoService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { Notificacion} from 'src/app/models/notificacion.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-aceptar-proyecto',
  templateUrl: './aceptar-proyecto.component.html',
  styleUrls: ['./aceptar-proyecto.component.css']
})
export class AceptarProyectoComponent implements OnInit {

  info = JSON.parse(localStorage.getItem("user"));
  proyecto = JSON.parse(localStorage.getItem("modalidad"));
  programa:any;
  jefe:any;
  fichaValid = false;
  documento_fichaAcademica = new FormData();
  MAX_SIZE_FILE: number = 1000000;

  constructor(private _proyectoService: ProyectoService, 
    private _notificacionService: NotificacionesService,
    private _programaService: ProgramaService,
    private router: Router)  { }

  ngOnInit(): void {
    this.getProgramaInfo();
  }

  getProgramaInfo() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma;
      this.jefe = infoPrograma.jefe;
    });
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const problemaTab = document.getElementById('problemaTab');
    const alcanceTab = document.getElementById('alcanceTab');
    const metodologiaTab = document.getElementById('metodologiaTab');
    problemaTab.setAttribute('class', 'nav-link text-body');
    alcanceTab.setAttribute('class', 'nav-link text-body');
    metodologiaTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  getFileFicha(file: File) {
    const labelFicha = document.getElementById("labelFicha") as HTMLElement;
    if (file.size > this.MAX_SIZE_FILE) {
      this.documento_fichaAcademica = new FormData();
      this.fichaValid = false;
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        labelFicha.setAttribute("style", "");
        labelFicha.innerHTML = "Click para subir el archivo del anteproyecto"
      });
    } else {
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const extensionesValidas = ['pdf', 'PDF'];
  
      if (extensionesValidas.indexOf(extensionArchivo) >= 0) {
        this.fichaValid = true;
        labelFicha.setAttribute("style", "color: #8F141B; font-weight: bold;");
        labelFicha.innerHTML = file.name;
        let documento_fichaAcademica = <File>file;
        if(this.proyecto.estudiante2._id === this.info._id){
          this.documento_fichaAcademica.append('documento_fichaAcademica2', documento_fichaAcademica, documento_fichaAcademica.name);
        }else if(this.proyecto.estudiante3){
          if(this.proyecto.estudiante3._id === this.info._id){
            this.documento_fichaAcademica.append('documento_fichaAcademica3', documento_fichaAcademica, documento_fichaAcademica.name);
          }
        }
      }else{
        this.documento_fichaAcademica = new FormData();
        this.fichaValid = false;
        Swal.fire({
          title: '¡Lo Sentimos!',
          html: `<p> El archivo deber ser en formato pdf</p>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          labelFicha.setAttribute("style", "");
          labelFicha.innerHTML = "Click para subir el archivo del anteproyecto"
        });
      }
    }
  }

  aceptarProyecto(){
    Swal.fire({
      text: '¿Confirmas ser parte del proyecto y enviar la ficha académica?',
      icon: 'question',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this._proyectoService.aceptarProyecto(this.proyecto._id).subscribe((resp:any)=>{
          if(resp){
            this._proyectoService.uploadDocumento(this.proyecto._id, this.documento_fichaAcademica).subscribe((respp:any)=>{
              if(respp){
                if(resp.estudiante2 && resp.aprobacionEstudiante2){
                  const curretdate = new Date();
                  if(!resp.estudiante3 && !resp.aprobacionEstudiante3){
                    if(this.programa._id === resp.estudiante.programa._id){
                      const estudiantes = resp.estudiante.nombres+" "+resp.estudiante.apellidos+", "+resp.estudiante2.nombres+" "+resp.estudiante2.apellidos;
                      const noti = new Notificacion(
                        this.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${estudiantes} te han enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        this.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti).subscribe();
                    }else{
                      const noti1 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante.nombres} ${resp.estudiante.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo,
                      );
                      const noti2 = new Notificacion(
                        this.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante2.nombres} ${resp.estudiante2.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        this.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti1).subscribe();
                      this._notificacionService.postNotificacion(noti2).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti1).subscribe((respC:any)=>{
                        if(respC){
                          this._notificacionService.sendNotificacionCorreo(noti2).subscribe();
                        }
                      });
                    }
                  }else if(resp.estudiante3 && resp.aprobacionEstudiante3){
                    if(resp.estudiante.programa._id === resp.estudiante2.programa._id && resp.estudiante.programa._id  === resp.estudiante3.programa._id ){
                      const estudiantes = resp.estudiante.nombres+" "+resp.estudiante.apellidos+", "+resp.estudiante2.nombres+" "+resp.estudiante2.apellidos+", "+resp.estudiante3.nombres+" "+resp.estudiante3.apellidos;
                      const noti = new Notificacion(
                        this.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${estudiantes} te han enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        this.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti).subscribe();
                    }else if(resp.estudiante.programa._id === resp.estudiante2.programa._id){
                      const estudiantes = resp.estudiante.nombres+" "+resp.estudiante.apellidos+", "+resp.estudiante2.nombres+" "+resp.estudiante2.apellidos;
                      const noti1 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${estudiantes} te han enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      const noti2 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante3.nombres} ${resp.estudiante3.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti1).subscribe();
                      this._notificacionService.postNotificacion(noti2).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti1).subscribe((respC2:any)=>{
                        this._notificacionService.sendNotificacionCorreo(noti2).subscribe();
                      });
                    }else if(resp.estudiante.programa._id === resp.estudiante3.programa._id){
                      const estudiantes = resp.estudiante.nombres+" "+resp.estudiante.apellidos+", "+resp.estudiante3.nombres+" "+resp.estudiante3.apellidos;
                      const noti1 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${estudiantes} te han enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      const noti2 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante2.nombres} ${resp.estudiante2.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti1).subscribe();
                      this._notificacionService.postNotificacion(noti2).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti1).subscribe((respC3:any)=>{
                        this._notificacionService.sendNotificacionCorreo(noti2).subscribe();
                      });
                    }else if(resp.estudiante2.programa._id === resp.estudiante3.programa._id){
                      const estudiantes = resp.estudiante2.nombres+" "+resp.estudiante2.apellidos+", "+resp.estudiante3.nombres+" "+resp.estudiante3.apellidos;
                      const noti1 = new Notificacion(
                        resp.estudiante2.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${estudiantes} te han enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante2.programa.jefe.correo
                      );
                      const noti2 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante.nombres} ${resp.estudiante.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti1).subscribe();
                      this._notificacionService.postNotificacion(noti2).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti1).subscribe((respC3:any)=>{
                        this._notificacionService.sendNotificacionCorreo(noti2).subscribe();
                      });
                    }else{
                      const noti1 = new Notificacion(
                        resp.estudiante.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante.nombres} ${resp.estudiante.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante.programa.jefe.correo
                      );
                      const noti2 = new Notificacion(
                        resp.estudiante2.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante2.nombres} ${resp.estudiante2.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante2.programa.jefe.correo
                      );
                      const noti3 = new Notificacion(
                        resp.estudiante3.programa.jefe._id,
                        curretdate,
                        'Solicitud de proyecto de grado',
                        `${resp.estudiante3.nombres} ${resp.estudiante3.apellidos} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        resp.estudiante3.programa.jefe.correo
                      );
                      this._notificacionService.postNotificacion(noti1).subscribe();
                      this._notificacionService.postNotificacion(noti2).subscribe();
                      this._notificacionService.postNotificacion(noti3).subscribe();
                      this._notificacionService.sendNotificacionCorreo(noti1).subscribe((respC4:any)=>{
                        this._notificacionService.sendNotificacionCorreo(noti2).subscribe((respC5:any)=>{
                          this._notificacionService.sendNotificacionCorreo(noti3).subscribe();
                        });
                      });
                    }
                  }
                }
                
                Swal.fire({
                  title: '¡Bien Hecho!',
                  text: `Ya eres parte del proyecto`,
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
                    this.router.navigate(["/panel-principal"]);
                  }else{
                    this.router.navigate(["/panel-principal"]);
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  rechazarProyecto(){
    Swal.fire({
      text: '¿Rechazas ser parte del proyecto?',
      icon: 'question',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this._proyectoService.rechazarProyecto(this.proyecto._id).subscribe((resp:any)=>{
            Swal.fire({
              text: `Rechazaste ser parte del proyecto, puedes inscribir otra modalidad`,
              icon: 'success',
              showCloseButton: false,
              showConfirmButton: false,
              showCancelButton: false,
              allowEnterKey: false,
              allowOutsideClick:false,
              allowEscapeKey: false,
              timer: 3000,
              timerProgressBar: true
            }).then((result) => {
              if(result.value || result.dismiss){
                this.router.navigate(["/modalidades"]);
              }else{
                this.router.navigate(["/modalidades"]);
              }
            });
        });
      }
    });
  }


}
