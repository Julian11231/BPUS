import { Component, OnInit } from '@angular/core';
import { NotificacionesService, ProyectoService, AdministrativoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { NgForm } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import { Notification } from 'rxjs';

@Component({
  selector: 'app-propuestas-proyecto',
  templateUrl: './propuestas-proyecto.component.html',
  styleUrls: ['./propuestas-proyecto.component.css']
})
export class PropuestasProyectoComponent implements OnInit {

  user  = JSON.parse(localStorage.getItem('user'));
  proyectos:any;
  proyectoSelected:any
  notas:string;
  directores:any;
  director:string = "";
  directorValid = false
  directorSelected:any;

  constructor(private _proyectoService: ProyectoService, 
    private _tutoresService: AdministrativoService,
    private _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    this.getPropuestas();
    this.getDirectores();
  }

  getDirectores() {
    this._tutoresService.getTutores(this.user.programa).subscribe((resp: any) => {
      this.directores = resp.admins;
    });
  }

  getPropuestas() {
    this._proyectoService.getProyectoEnviados(this.user.programa).subscribe((resp: any) => {
      this.proyectos = resp.proyectos;
    });
  }

  rechazarSolicitud(form: NgForm){
    let proyecto:any = {estado: "Ajustar", estado_inscripcion: "Ajustar", notas: this.notas};
    const btnCloseRechazar = (document.getElementById('btnCloseRechazar')) as HTMLButtonElement;
    btnCloseRechazar.click();
    Swal.fire({
      title: 'Por favor espera!',
      html: '<b></b>',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton:false,
      timer: 1000*60*5,
      timerProgressBar: true,
      onOpen: () => {
        Swal.showLoading();
        const content = Swal.getHtmlContainer();
        const b = content.querySelector('b');
        b.textContent = "Rechazando proyecto"
        this._proyectoService.putJefeProyecto(this.proyectoSelected._id, proyecto).subscribe(async(resp:any)=>{
          if(resp){
            const fechaActual = new Date();
            let notiE = new Notificacion(
              this.proyectoSelected.estudiante._id,
              fechaActual,
              "Proyecto rechazado",
              `Tu proyecto ha sido rechazado, por favor ajustalo`,
              "Estudiante",
              this.proyectoSelected.estudiante.correo
            );
            b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante.nombres;
            await this._notificacionService.postNotificacion(notiE).toPromise();
            await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            if(this.proyectoSelected.estudiante2){
              notiE.receptor = this.proyectoSelected.estudiante2._id;
              notiE.receptorCorreo = this.proyectoSelected.estudiante2.correo;
              b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante2.nombres;
              await this._notificacionService.postNotificacion(notiE).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            }
            if(this.proyectoSelected.estudiante3){
              notiE.receptor = this.proyectoSelected.estudiante3._id;
              notiE.receptorCorreo = this.proyectoSelected.estudiante3.correo;
              b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante3.nombres;
              await this._notificacionService.postNotificacion(notiE).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            }
          }
          Swal.close();
        });
      },
      onClose: () => {
        Swal.fire({
          title: '¡Bien Hecho!',
          html: "Proyecto rechazado correctamente",
          icon: 'success',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton:false,
          timer: 1300,
          timerProgressBar: true
        }).then(() => {
        this.getPropuestas();
        this.notas = "";
        this.directorSelected = "";
        this.director = "";
        this.directorValid = false;
        });
      }
    }).then(() => {
      this.getPropuestas();
      this.notas = "";
      this.directorSelected = "";
      this.director = "";
      this.directorValid = false;
    });
  }
    

  aprobarSolicitud(form: NgForm){
    let proyecto:any = {estado: "En ejecución"};
    if(this.directorSelected._id !== this.proyectoSelected.director._id){
      proyecto.director = this.directorSelected._id;
    }
    if(this.notas !== ""){
      proyecto.notas = this.notas;
    }
    const btnCloseAprobar = (document.getElementById('btnCloseAprobar')) as HTMLButtonElement;
    btnCloseAprobar.click();
    Swal.fire({
      title: 'Por favor espera!',
      html: '<b></b>',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton:false,
      timer: 1000*60*5,
      timerProgressBar: true,
      onOpen: () => {
        Swal.showLoading();
        const content = Swal.getHtmlContainer();
        const b = content.querySelector('b');
        b.textContent = "Aprobando proyecto"
        this._proyectoService.putJefeProyecto(this.proyectoSelected._id, proyecto).subscribe(async(resp:any)=>{
          if(resp){
            const fechaActual = new Date();
            let notiE = new Notificacion(
              this.proyectoSelected.estudiante._id,
              fechaActual,
              "Proyecto aprobado",
              `Tu proyecto ha sido aprobado y tu director será ${this.directorSelected.nombres} ${this.directorSelected.apellidos}`,
              "Estudiante",
              this.proyectoSelected.estudiante.correo
            );
            b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante.nombres;
            await this._notificacionService.postNotificacion(notiE).toPromise();
            await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            if(this.proyectoSelected.estudiante2){
              notiE.receptor = this.proyectoSelected.estudiante2._id;
              notiE.receptorCorreo = this.proyectoSelected.estudiante2.correo;
              b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante2.nombres;
              await this._notificacionService.postNotificacion(notiE).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            }
            if(this.proyectoSelected.estudiante3){
              notiE.receptor = this.proyectoSelected.estudiante3._id;
              notiE.receptorCorreo = this.proyectoSelected.estudiante3.correo;
              b.textContent = "Enviando notificación a "+this.proyectoSelected.estudiante3.nombres;
              await this._notificacionService.postNotificacion(notiE).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notiE).toPromise();
            }
            let estudiante = this.proyectoSelected.estudiante.nombres+" "+this.proyectoSelected.estudiante.apellidos;
            let txt = "el estudiante";
            if(this.proyectoSelected.estudiante2 && !this.proyectoSelected.estudiante3){
              txt = "los estudiantes";
              estudiante = estudiante+" y "+this.proyectoSelected.estudiante2.nombres+" "+this.proyectoSelected.estudiante2.apellidos;
            }else if(this.proyectoSelected.estudiante2 && this.proyectoSelected.estudiante3){
              estudiante = estudiante+", "+this.proyectoSelected.estudiante2.nombres+" "+this.proyectoSelected.estudiante2.apellidos;
            }
            if(this.proyectoSelected.estudiante3){
              estudiante = estudiante+" y "+this.proyectoSelected.estudiante3.nombres+" "+this.proyectoSelected.estudiante3.apellidos
            }
            let notificacion = new Notificacion(
              this.directorSelected._id,
              fechaActual,
              'Asignación de director de proyecto de grado',
              `Te han asignado como director del proyecto de grado de ${txt} ${estudiante}`,
              'Administrativo',
              this.directorSelected.correo);
              b.textContent = "Enviando notificación al diector";
              await this._notificacionService.postNotificacion(notificacion).toPromise();
              await this._notificacionService.sendNotificacionCorreo(notificacion).toPromise();
            Swal.close();
          }
        });
      },
      onClose: () => {
        Swal.fire({
          title: '¡Bien Hecho!',
          html: "Proyecto aprobado correctamente",
          icon: 'success',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton:false,
          timer: 1300,
          timerProgressBar: true
        }).then(() => {
        this.getPropuestas();
        this.escoderNotas();
        this.notas = "";
        this.directorSelected = "";
        this.director = "";
        this.directorValid = false;
        });
      }
    }).then(() => {
      this.getPropuestas();
      this.escoderNotas();
      this.notas = "";
      this.directorSelected = "";
      this.director = "";
      this.directorValid = false;
    });
  }

  getDataInfo(proyecto:any){
    this.notas = "";
    this.directorSelected = "";
    this.director = "";
    this.directorValid = false;
    this.proyectoSelected = proyecto;
  }

  escoderNotas(){
    const notasAprobar = document.getElementById("notasAprobar") as HTMLElement;
    notasAprobar.setAttribute("class", "collapse")
  }

  getDirectorSelected(){
    var selectDirector = (document.getElementById("directorSelected")) as HTMLSelectElement;
    var selectedIndex = selectDirector.selectedIndex;

    if(selectedIndex > 0){
      selectedIndex = selectedIndex-1;
      this.directorSelected = this.directores[selectedIndex];
      this.directorValid = true;
    }else{
      this.directorSelected = "";
      this.directorValid = false;
    }
  }

  getDataBuscar(valor: string){
    
  }

}
