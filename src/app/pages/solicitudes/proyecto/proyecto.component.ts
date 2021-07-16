import { Component, OnInit } from '@angular/core';
import { AdministrativoService, EstudianteService, NotificacionesService, ProgramaService, ProyectoService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';
import { HtmlAstPath } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class SolicitudProyectoComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  estudiante2: any;
  estudiante3:any;

  busquedasInvalidas = 0;
  userToAddValid = false;
  fichaValid = false;
  inscripcionValid = false;
  formularioValid = false;
  director:string;
  programa:any;
  jefe:any;
  docentes:any;

  documento_fichaAcademica = new FormData();
  documento_inscripcion = new FormData();
  MAX_SIZE_FILE: number = 1000000;

  constructor(
    private _adminService:AdministrativoService,
    private _estudianteService: EstudianteService,
    private _programaService: ProgramaService,
    private _notificacionService: NotificacionesService,
    private _proyectoService: ProyectoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProgramaInfo();
    this.getDocentes();
  }

  getProgramaInfo() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma;
      this.jefe = infoPrograma.jefe;
    });
  }

  getDocentes(){
    const director = document.getElementById("director") as HTMLInputElement;
    this._adminService.getTutores(this.user.programa).subscribe( async (resp:any) =>{
      this.docentes = resp.admins;
      let maxlength = 0;
      for(let i= 0; i < this.docentes.length; i++){
        this.docentes[i].nombres = this.docentes[i].nombres+" "+this.docentes[i].apellidos;
        if(this.docentes[i].nombres.length > maxlength){
          maxlength = this.docentes[i].nombres.length;
        }
        delete this.docentes[i].apellidos;
        delete this.docentes[i].estado;
        delete this.docentes[i].telefono;
        delete this.docentes[i].programa;
        delete this.docentes[i].rol;
      }
      director.maxLength = maxlength;
    });
  }

  check(){
    const tituloPasantia = (document.getElementById("tituloPasantia") as HTMLInputElement).value;
    const lineaInvestigacion = (document.getElementById("lineaInvestigacion") as HTMLSelectElement).value;
    const director = (document.getElementById("director") as HTMLSelectElement).value;
    let isInDocentes = false;
    for(let i= 0; i < this.docentes.length; i++){
      if(director === this.docentes[i].nombres){
        isInDocentes = true;
        this.director = this.docentes[i]._id;
      }
    }
    if(
      isInDocentes && 
      tituloPasantia !== "" && 
      lineaInvestigacion !== "" 
    ){
      this.formularioValid = true;
    }else{
      this.formularioValid = false;
    }
  }

  checkUserToAdd(){
    const buscarUser = document.getElementById("buscarUser") as HTMLInputElement
    buscarUser.value = buscarUser.value.replace(/\D/g, "");
    if(buscarUser.value.length == 11 && buscarUser.value !== this.user.codigo){
      this.userToAddValid = true;
    }else{
      this.userToAddValid = false;
    } 
  }

  buscarEstudiante(){
    let buscarUser = document.getElementById("buscarUser") as HTMLInputElement;
    const msgError = document.getElementById("msgError") as HTMLElement;
    buscarUser.value = buscarUser.value.replace(/\D/g, "");
    if(buscarUser.value.length == 11 && buscarUser.value !== this.user.codigo){
      this._estudianteService.getEstudiante(buscarUser.value).subscribe((resp:any)=>{
        if(resp.ok){
          if(this.estudiante2){
            if(resp.estudiante.codigo !== this.estudiante2.codigo){
              this.estudiante3 = resp.estudiante;
              this.esconderBuscar();
            }else{
              msgError.setAttribute("style","display:block; color:red");
              msgError.innerHTML = "Ya está inscrito";
              this.busquedasInvalidas = this.busquedasInvalidas+1;
              this.userToAddValid = false;
              buscarUser.value = "";
              setTimeout(() => {
                msgError.setAttribute("style","display:none;");
              },3000);
            }
          }else{
            msgError.setAttribute("style","display:none;");
            this.estudiante2 = resp.estudiante;
            this.userToAddValid = false;
            buscarUser.value = "";
          }
        }else{
          this.busquedasInvalidas = this.busquedasInvalidas+1;
          msgError.setAttribute("style","display:block; color:red");
          msgError.innerHTML = resp.mensaje;
          this.userToAddValid = false;
          buscarUser.value = "";
          setTimeout(() => {
            msgError.setAttribute("style","display:none;");
          },3000);
        }
        if(this.busquedasInvalidas >= 5 && this.busquedasInvalidas < 7){
          Swal.fire({
            text: "No hagas tantas busquedas invalidas, asegurtate de saber el código",
            icon: "warning",
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton:false,
            timer: 3000,
            timerProgressBar: true
          });
        }else if(this.busquedasInvalidas >= 7){
          Swal.fire({
            title: "Has hecho busquedas invalidas demasiadas veces",
            icon: "error",
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton:false,
            timer: 3000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(["/login"]);
          });
        }
      });
    }
  }

  eliminarEstudiante2(){
    if(this.estudiante3){
      this.estudiante2 = this.estudiante3;
      this.estudiante3 = undefined;
    }else{
      this.estudiante2 = undefined;
    }
  }

  eliminarEstudiante3(){
    this.estudiante3 = undefined;
  }

  mostrarBuscar(){
    const buscarEstudiante = document.getElementById("buscarEstudiante") as HTMLElement;
    const btnShowSearch = document.getElementById("btnShowSearch") as HTMLButtonElement;
    btnShowSearch.setAttribute("style", "display:none;");
    buscarEstudiante.setAttribute("style", "display:block;");
  }

  esconderBuscar(){
    const buscarEstudiante = document.getElementById("buscarEstudiante") as HTMLElement;
    const btnShowSearch = document.getElementById("btnShowSearch") as HTMLButtonElement;
    btnShowSearch.setAttribute("style", "display:block;");
    buscarEstudiante.setAttribute("style", "display:none;");
  }

  getFileFicha(file: File) {
    if (file.size > this.MAX_SIZE_FILE) {
      const fileFicha = document.getElementById("fileFicha") as HTMLInputElement;
      const labelFicha = document.getElementById("labelFicha") as HTMLInputElement;
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
        fileFicha.value = "";
        labelFicha.innerHTML = "Click aquí para subir la ficha academica";
        labelFicha.setAttribute("style","");
      });
    } else {
      const labelFicha = document.getElementById("labelFicha") as HTMLInputElement;
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];
      const extensionesValidas = ['pdf', 'PDF'];
  
      if (extensionesValidas.indexOf(extensionArchivo) >= 0) {
        this.fichaValid = true;
        labelFicha.setAttribute("style", "color: #8F141B; font-weight: bold;");
        labelFicha.innerHTML = file.name;
        let documento_fichaAcademica = <File>file;
        this.documento_fichaAcademica.append('documento_fichaAcademica', documento_fichaAcademica, documento_fichaAcademica.name);
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
          labelFicha.innerHTML = "Click aquí para subir la ficha academica";
        });
      }
    }
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

  postProyecto(){
    Swal.fire({
      title: '¿Enviar solicitud de proyecto de grado?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        const tituloPasantia = (document.getElementById("tituloPasantia") as HTMLInputElement).value;
        const lineaInvestigacion = (document.getElementById("lineaInvestigacion") as HTMLSelectElement).value;
        let proyecto:any = {
          estudiante: this.user._id,
          programa: this.programa._id,
          lineaInvestigacion: lineaInvestigacion,
          titulo: tituloPasantia,
          director: this.director,
        }
        if(this.estudiante2){
          proyecto.estudiante2 = this.estudiante2._id;
        }
        if(this.estudiante3){
          proyecto.estudiante3 = this.estudiante3._id;
        }
        this._proyectoService.postProyecto(proyecto).subscribe((resp:any)=>{
          if(resp){
            this._proyectoService.uploadDocumento(resp._id, this.documento_fichaAcademica).subscribe((answ:any)=>{
              if(answ){
                this._proyectoService.uploadDocumento(resp._id, this.documento_inscripcion).subscribe((respI:any)=>{
                   if(respI){
                    let currentDate = new Date();
                    let estudiante = this.user.nombres+" "+this.user.apellidos;
                    if(!this.estudiante2 && !this.estudiante3){
                      let notificacion = new Notificacion(
                        this.jefe._id,
                        currentDate,
                        'Nueva solicitd de proyecto de grado',
                        `${estudiante} te ha enviado una solicitud de proyecto de grado`,
                        'Administrativo',
                        this.jefe.correo);
                      this._notificacionService.postNotificacion(notificacion).subscribe();
                      this._notificacionService.sendNotificacionCorreo(notificacion).subscribe();
                    }
                    Swal.fire({
                      title: '¡Bien Hecho!',
                      html: `Su solicitud fue eviada exitosamente, el radicado de su solicitud es: <b> ${resp._id}</b>`,
                      icon: 'warning',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#60D89C',
                      allowEnterKey:false,
                      allowOutsideClick:false,
                      allowEscapeKey:false
                    }).then((result) => {
                      if (result.value) {
                        localStorage.setItem("reload", "true");
                        this.router.navigate(['/']);
                      }else{
                        localStorage.setItem("reload", "true");
                        this.router.navigate(['/']);
                      }
                    }); 
                   } 
                });
              }
            });
          }
        });
      }
    });   
  }

}
