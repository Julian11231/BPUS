import { Component, OnInit } from '@angular/core';
import { ProyectoService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutoria-proyecto',
  templateUrl: './tutoria-proyecto.component.html',
  styleUrls: ['./tutoria-proyecto.component.css']
})
export class TutoriaProyectoComponent implements OnInit {

  proyectos: any[];
  proyectoSelected: any;
  //Nuevos estados
  new_estado_inscripcion:string = "";
  new_estado_anteproyecto:string = "";
  new_estado_proyecto:string = "";
  //Nuevas notas
  new_notas_inscripcion:string = "";
  new_notas_anteproyecto:string = "";
  new_notas_proyecto:string = "";

  constructor(private _notificacionService: NotificacionesService, 
    private _proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    const user  = JSON.parse(localStorage.getItem('user'));
    this._proyectoService.getProyectosDirector(user._id).subscribe((resp: any) => {
      this.proyectos = resp.proyectos;
      let currentDate = new Date();
      for (let i = 0; i < this.proyectos.length; i++) {
        if(this.proyectos[i].fecha_aprobacion){
          let fechaInicio = new Date(Date.parse(this.proyectos[i].fecha_aprobacion));
          let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          if(Math.floor(diff) === 0){
            this.proyectos[i].semanas = 1;
          }else{
            this.proyectos[i].semanas = Math.floor(diff);
          }
        }
      }
    })
  }

  putProyecto(){
    let proyecto:any = {};
    if(this.new_estado_inscripcion){
      proyecto.estado_inscripcion = this.new_estado_inscripcion;
    }
    if(this.new_estado_anteproyecto){
      proyecto.estado_anteproyecto = this.new_estado_anteproyecto;
    }
    if(this.new_estado_proyecto){
      proyecto.estado_proyecto = this.new_estado_proyecto;
    }
    if(this.new_notas_inscripcion){
      proyecto.notas_inscripcion = this.new_notas_inscripcion;
    }
    if(this.new_notas_anteproyecto){
      proyecto.notas_anteproyecto = this.new_notas_anteproyecto;
    }
    if(this.new_notas_proyecto){
      proyecto.notas_proyecto = this.new_notas_proyecto;
    }
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
        b.textContent = "Guardando cambios";
        this._proyectoService.putDirectorProyecto(this.proyectoSelected._id, proyecto).subscribe(async(resp:any)=>{
          if(resp){
            const fechaActual = new Date();
            let txt:string  = "Te han"; 
            if(this.new_estado_inscripcion !== ""){
              if(this.new_estado_inscripcion === "Aprobada"){
                txt = txt+" aprobado la inscripción del proyecto";
              }else{
                txt = txt+" pedido ajustar la inscripción del proyecto";
              }
            }
            if(this.new_estado_anteproyecto !== "" && this.new_estado_inscripcion === ""){
              if(this.new_estado_anteproyecto === "Aprobado"){
                txt = txt+" aprobado el anteproyecto";
              }else{
                txt = txt+" pedido ajustar el anteproyecto";
              }
            }else if(this.new_estado_anteproyecto !== "" && this.new_estado_proyecto === ""){
              if(this.new_estado_anteproyecto === "Aprobado"){
                txt = txt+" y te han aprobado el anteproyecto";
              }else{
                txt = txt+" y te han pedido ajustar el anteproyecto";
              }
            }else{
              if(this.new_estado_anteproyecto === "Aprobado"){
                txt = txt+", te han aprobado el anteproyecto";
              }else{
                txt = txt+", te han pedido ajustar el anteproyecto";
              }
            }
            if(this.new_estado_proyecto !== "" && this.new_estado_inscripcion === "" && this.new_estado_anteproyecto === ""){
              if(this.new_estado_proyecto === "Aprobado"){
                txt = txt+" aprobado el proyecto";
              }else{
                txt = txt+" pedido ajustar el proyecto";
              }
            }else if(this.new_estado_proyecto !== ""){
              if(this.new_estado_proyecto === "Aprobado"){
                txt = txt+" y te han aprobado el proyecto";
              }else{
                txt = txt+" y te han pedido ajustar el proyecto";
              }
            }
            let notiE = new Notificacion(
              this.proyectoSelected.estudiante._id,
              fechaActual,
              "Tu director ha calificado el proyecto",
              txt,
              "Estudiante",
              this.proyectoSelected.estudiante.correo
            );
            console.log(notiE);
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
        const btnCloseModalGestion = (document.getElementById("btnCloseModalGestion")) as HTMLElement;
        btnCloseModalGestion.click();
        Swal.fire({
          title: '¡Bien Hecho!',
          html: `Proyecto actualizado correctamente`,
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
        this.getProyectos();
        });
      }
    }).then(() => {
      const btnCloseModalGestion = (document.getElementById("btnCloseModalGestion")) as HTMLElement;
      btnCloseModalGestion.click();
      this.getProyectos();
    });
  }

  getDataBuscar(dato:string){

  }

  ajusteInscripcion(){
    this.new_estado_inscripcion = 'Ajustar';
    let notasInscripcion = (document.getElementById("notasInscripcion")) as HTMLElement;
    let btnAjusteInscripcion = (document.getElementById("btnAjusteInscripcion")) as HTMLElement;
    let notas_inscripcion = (document.getElementById("notas_inscripcion")) as HTMLElement;
    notasInscripcion.setAttribute('colspan','5');
    btnAjusteInscripcion.setAttribute('style','display:none');
    notas_inscripcion.setAttribute('class','collapse');
    if(this.proyectoSelected.estado_inscripcion !== "Enviada") {
      let cancelarAjusteInscripcion = (document.getElementById('cancelarAjusteInscripcion')) as HTMLButtonElement;
      cancelarAjusteInscripcion.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasInscripcion(){
    let notasInscripcion = (document.getElementById("notasInscripcion")) as HTMLElement;
    let notas_inscripcion = (document.getElementById("notas_inscripcion")) as HTMLElement;
    let btnAjusteInscripcion = (document.getElementById("btnAjusteInscripcion")) as HTMLElement;
    if(this.proyectoSelected?.estado_inscripcion === 'Aprobada'){
      let ajusteInscripcion = (document.getElementById('ajusteInscripcion')) as HTMLButtonElement;
      notasInscripcion.setAttribute('colspan','4');
      notas_inscripcion.setAttribute('class','collapse show');
      btnAjusteInscripcion.setAttribute('style','display:block');
      ajusteInscripcion.setAttribute('style', 'display:none');
    }else if(this.new_estado_inscripcion === 'Ajustar'){
      notasInscripcion.setAttribute('colspan','4');
      notas_inscripcion.setAttribute('class','collapse show');
      btnAjusteInscripcion.setAttribute('style','display:block');
    }else if(this.new_estado_inscripcion === "Aprobada"){
      this.new_notas_inscripcion = "";
      notasInscripcion.setAttribute('colspan','5');
      notas_inscripcion.setAttribute('class','collapse');
      btnAjusteInscripcion.setAttribute('style','display:none');
    }else{
      if(this.proyectoSelected.notas_inscripcion){
        this.new_notas_inscripcion = this.proyectoSelected.notas_inscripcion;
      }else{
        this.new_notas_inscripcion = "";
      }
      notasInscripcion.setAttribute('colspan','5');
      notas_inscripcion.setAttribute('class','collapse');
      btnAjusteInscripcion.setAttribute('style','display:none');
    }
  }

  cancelarAjusteInscripcion(){
    this.new_estado_inscripcion = '';
    if(this.proyectoSelected.notas_inscripcion){
      this.new_notas_inscripcion = this.proyectoSelected.notas_inscripcion;
    }else{
      this.new_notas_inscripcion = "";
    }
    let notasInscripcion = (document.getElementById("notasInscripcion")) as HTMLElement;
    let btnAjusteInscripcion = (document.getElementById("btnAjusteInscripcion")) as HTMLElement;
    let notas_inscripcion = (document.getElementById("notas_inscripcion")) as HTMLElement;
    notasInscripcion.setAttribute('colspan','5');
    btnAjusteInscripcion.setAttribute('style','display:none');
    notas_inscripcion.setAttribute('class','collapse');
    if(this.proyectoSelected.estado_inscripcion !== "Enviada") {
      let ajusteInscripcion = (document.getElementById('ajusteInscripcion')) as HTMLButtonElement;
      let cancelarAjusteInscripcion = (document.getElementById('cancelarAjusteInscripcion')) as HTMLButtonElement;
      ajusteInscripcion.setAttribute('style', 'display:block');
      cancelarAjusteInscripcion.setAttribute('style', 'display:none;');
    }
  }

  ajusteAnteproyecto(){
    this.new_estado_anteproyecto = 'Ajustar';
    let notasAnteproyecto = (document.getElementById("notasAnteproyecto")) as HTMLElement;
    let notas_anteproyecto = (document.getElementById("notas_anteproyecto")) as HTMLElement;
    let btnAjusteAnteproyecto = (document.getElementById("btnAjusteAnteproyecto")) as HTMLElement;
    notasAnteproyecto.setAttribute('colspan','5');
    btnAjusteAnteproyecto.setAttribute('style','display:none');
    notas_anteproyecto.setAttribute('class','collapse');
    if(this.proyectoSelected.estado_anteproyecto !== "Enviado") {
      let cancelarAjusteAnteproyecto = (document.getElementById('cancelarAjusteAnteproyecto')) as HTMLButtonElement;
      cancelarAjusteAnteproyecto.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasAnteproyecto(){
      let notasAnteproyecto = (document.getElementById("notasAnteproyecto")) as HTMLElement;
      let notas_anteproyecto = (document.getElementById("notas_anteproyecto")) as HTMLElement;
      let btnAjusteAnteproyecto = (document.getElementById("btnAjusteAnteproyecto")) as HTMLElement;
      if(this.proyectoSelected?.estado_anteproyecto === 'Aprobado'){
        let ajusteAnteproyecto = (document.getElementById('ajusteAnteproyecto')) as HTMLButtonElement;
        notasAnteproyecto.setAttribute('colspan','4')
        notas_anteproyecto.setAttribute('class','collapse show');
        btnAjusteAnteproyecto.setAttribute('style','display:block');
        ajusteAnteproyecto.setAttribute('style', 'display:none');
      }else if(this.new_estado_anteproyecto === 'Ajustar'){
        notasAnteproyecto.setAttribute('colspan','4');
        notas_anteproyecto.setAttribute('class','collapse show');
        btnAjusteAnteproyecto.setAttribute('style','display:block');
      }else{
        if(this.proyectoSelected.notas_anteproyecto){
          this.new_notas_anteproyecto = this.proyectoSelected.notas_anteproyecto;
        }else{
          this.new_notas_anteproyecto = "";
        }
        notas_anteproyecto.setAttribute('class','collapse');
        notasAnteproyecto.setAttribute('colspan','5');
        btnAjusteAnteproyecto.setAttribute('style','display:none');
      }
  }

  cancelarAjusteAnteproyecto(){
    this.new_estado_anteproyecto = '';
    if(this.proyectoSelected.notas_anteproyecto){
      this.new_notas_anteproyecto = this.proyectoSelected.notas_anteproyecto;
    }else{
      this.new_notas_anteproyecto = "";
    }
    let notasAnteproyecto = (document.getElementById("notasAnteproyecto")) as HTMLElement;
    let btnAjusteAnteproyecto = (document.getElementById("btnAjusteAnteproyecto")) as HTMLElement;
    let notas_anteproyecto = (document.getElementById("notas_anteproyecto")) as HTMLElement;
    btnAjusteAnteproyecto.setAttribute('style','display:none');
    notas_anteproyecto.setAttribute('class','collapse');
    notasAnteproyecto.setAttribute('colspan','5');
    if(this.proyectoSelected.estado_anteproyecto !== "Enviado") {
      let ajusteAnteproyecto = (document.getElementById('ajusteAnteproyecto')) as HTMLButtonElement;
      let cancelarAjusteAnteproyecto = (document.getElementById('cancelarAjusteAnteproyecto')) as HTMLButtonElement;
      ajusteAnteproyecto.setAttribute('style', 'display:block');
      cancelarAjusteAnteproyecto.setAttribute('style', 'display:none;');
    }
  }

  ajusteProyecto(){
    this.new_estado_proyecto = 'Ajustar';
    let notasProyecto = (document.getElementById("notasProyecto")) as HTMLElement;
    let notas_proyecto = (document.getElementById("notas_proyecto")) as HTMLElement;
    let btnAjusteProyecto = (document.getElementById("btnAjusteProyecto")) as HTMLElement;
    notasProyecto.setAttribute('colspan','5');
    btnAjusteProyecto.setAttribute('style','display:none');
    notas_proyecto.setAttribute('class','collapse');
    if(this.proyectoSelected.estado_proyecto !== "Enviado") {
      let btnAjusteProyecto = (document.getElementById('btnAjusteProyecto')) as HTMLButtonElement;
      btnAjusteProyecto.setAttribute('style', 'display:block; color: #8F141B');
    }
  }

  notasProyecto(){
      let notasProyecto = (document.getElementById("notasProyecto")) as HTMLElement;
      let notas_proyecto = (document.getElementById("notas_proyecto")) as HTMLElement;
      let btnAjusteProyecto = (document.getElementById("btnAjusteProyecto")) as HTMLElement;
      if(this.proyectoSelected?.estado_proyecto === 'Aprobado'){
        let ajusteProyecto = (document.getElementById('ajusteProyecto')) as HTMLButtonElement;
        notasProyecto.setAttribute('colspan','4')
        notas_proyecto.setAttribute('class','collapse show');
        btnAjusteProyecto.setAttribute('style','display:block');
        ajusteProyecto.setAttribute('style', 'display:none');
      }else if(this.new_estado_proyecto === 'Ajustar'){
        notasProyecto.setAttribute('colspan','4');
        notas_proyecto.setAttribute('class','collapse show');
        btnAjusteProyecto.setAttribute('style','display:block');
      }else{
        if(this.proyectoSelected.notas_proyecto){
          this.new_notas_proyecto = this.proyectoSelected.notas_proyecto;
        }else{
          this.new_notas_proyecto = "";
        }
        notas_proyecto.setAttribute('class','collapse');
        notasProyecto.setAttribute('colspan','5');
        btnAjusteProyecto.setAttribute('style','display:none');
      }
  }

  cancelarAjusteProyecto(){
    this.new_estado_proyecto = '';
    if(this.proyectoSelected.notas_proyecto){
      this.new_notas_proyecto = this.proyectoSelected.notas_proyecto;
    }else{
      this.new_notas_proyecto = "";
    }
    let notasProyecto = (document.getElementById("notasProyecto")) as HTMLElement;
    let btnAjusteProyecto = (document.getElementById("btnAjusteProyecto")) as HTMLElement;
    let notas_proyecto = (document.getElementById("notas_proyecto")) as HTMLElement;
    btnAjusteProyecto.setAttribute('style','display:none');
    notas_proyecto.setAttribute('class','collapse');
    notasProyecto.setAttribute('colspan','5');
    if(this.proyectoSelected.estado_proyecto !== "Enviado") {
      let ajusteProyecto = (document.getElementById('ajusteProyecto')) as HTMLButtonElement;
      let cancelarAjusteProyecto = (document.getElementById('cancelarAjusteProyecto')) as HTMLButtonElement;
      ajusteProyecto.setAttribute('style', 'display:block');
      btnAjusteProyecto.setAttribute('style', 'display:none;');
    }
  }

  getDataInfo(data: any) {
    this.proyectoSelected = data;
    if(this.proyectoSelected.notas_inscripcion){
      this.new_notas_inscripcion = this.proyectoSelected.notas_inscripcion;
    }else{
      this.new_notas_inscripcion = "";
    }
    if(this.proyectoSelected.notas_anteproyecto){
      this.new_notas_anteproyecto = this.proyectoSelected.notas_anteproyecto;
    }else{
      this.new_notas_anteproyecto = "";
    }
    if(this.proyectoSelected.notas_proyecto){
      this.new_notas_proyecto = this.proyectoSelected.notas_proyecto;
    }else{
      this.new_notas_proyecto = "";
    }
  }

  resetDataInfo(){
    this.new_estado_inscripcion = "";
    this.new_estado_anteproyecto = "";
    this.new_estado_proyecto = "";

    this.new_notas_inscripcion = "";
    this.new_notas_anteproyecto = "";
    this.new_notas_proyecto = "";

    //reset inscripcion
    if(this.proyectoSelected.estado_inscripcion){
      let notasInscripcion = (document.getElementById("notasInscripcion")) as HTMLElement;
      let btnAjusteInscripcion = (document.getElementById("btnAjusteInscripcion")) as HTMLElement;
      let notas_inscripcion = (document.getElementById("notas_inscripcion")) as HTMLElement;
      notasInscripcion.setAttribute('colspan','5');
      btnAjusteInscripcion.setAttribute('style','display:none');
      notas_inscripcion.setAttribute('class','collapse');
      if(this.proyectoSelected.estado_inscripcion === "Aprobada") {
        let cancelarAjusteInscripcion = (document.getElementById('cancelarAjusteInscripcion')) as HTMLButtonElement;
        let ajusteInscripcion = (document.getElementById('ajusteInscripcion')) as HTMLButtonElement;
        cancelarAjusteInscripcion.setAttribute('style', 'display:none;');
        ajusteInscripcion.setAttribute('style', 'display:block;');
      }
    }
    //reset anteproyecto
    if(this.proyectoSelected.estado_anteproyecto){
      let notasAnteproyecto = (document.getElementById("notasAnteproyecto")) as HTMLElement;
      let notas_anteproyecto = (document.getElementById("notas_anteproyecto")) as HTMLElement;
      let btnAjusteAnteproyecto = (document.getElementById("btnAjusteAnteproyecto")) as HTMLElement;
      notasAnteproyecto.setAttribute('colspan','5');
      btnAjusteAnteproyecto.setAttribute('style','display:none');
      notas_anteproyecto.setAttribute('class','collapse');
      if(this.proyectoSelected.estado_anteproyecto === "Aprobada") {
        let cancelarAjusteAnteproyecto = (document.getElementById('cancelarAjusteAnteproyecto')) as HTMLButtonElement;
        let ajusteAnteproyecto = (document.getElementById('ajusteAnteproyecto')) as HTMLButtonElement;
        cancelarAjusteAnteproyecto.setAttribute('style', 'display:none;');
        ajusteAnteproyecto.setAttribute('style', 'display:block;');
      }
    }
    //reset proyecto
    if(this.proyectoSelected.estado_proyecto){
      let notasProyecto = (document.getElementById("notasProyecto")) as HTMLElement;
      let notas_proyecto = (document.getElementById("notas_proyecto")) as HTMLElement;
      let btnAjusteProyecto = (document.getElementById("btnAjusteProyecto")) as HTMLElement;
      notasProyecto.setAttribute('colspan','5');
      btnAjusteProyecto.setAttribute('style','display:none');
      notas_proyecto.setAttribute('class','collapse');
      if(this.proyectoSelected.estado_proyecto === "Enviada") {
        let btnAjusteProyecto = (document.getElementById('btnAjusteProyecto')) as HTMLButtonElement;
        let ajusteProyecto = (document.getElementById('ajusteProyecto')) as HTMLButtonElement;
        btnAjusteProyecto.setAttribute('style', 'display:none;');
        ajusteProyecto.setAttribute('style', 'display:block;');
      }
    }   
  }

}
