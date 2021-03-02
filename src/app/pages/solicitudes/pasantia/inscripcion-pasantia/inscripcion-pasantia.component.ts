import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VacantesService, PasantiService, NotificacionesService,ProgramaService } from 'src/app/services/service.index';
import { Pasantia } from 'src/app/models/Pasantia';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscripcion-pasantia',
  templateUrl: './inscripcion-pasantia.component.html',
  styleUrls: ['./inscripcion-pasantia.component.css']
})
export class InscripcionPasantiaComponent implements OnInit {

  info: any;
  vacantes: any[];

  jefeProgramaID:string;
  letra: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  funciones: string;
  descripcion: string;
  cantidad: number;
  pagada: string;
  personaCargo: string;
  correo: string;
  telefono: string;

  preInscripcion: any;
  nombreEmpresa: string;

  constructor(public _vacantesService: VacantesService, 
              public _pasantiaService: PasantiService,
              public _notificacionService: NotificacionesService,
              public _programaService: ProgramaService,
              public router: Router) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    this._programaService.getPrograma().subscribe((resp:any) => {
      this.jefeProgramaID = resp.programa.jefe._id;
    } )
    if(estudiante){
      this.info = estudiante;
      this.getVacantesEstudiante();
    }else{
      this.info = admin;
      this.getVacantes();
    }
    
  }

  postSolicitud(form: NgForm) {

    let idEstudiante = this.info._id;

    Swal.fire({
      title: '¿Hacer Pre-Incripición?',
      text: `Usted realizaría la pasatía en la empresa:  ${this.nombreEmpresa}`,
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        setTimeout(() => {

          let preInscripcion = new Pasantia(
            this.empresa,
            this.preInscripcion,
            form.value.eps
          )
          this._pasantiaService.postSolicitud(idEstudiante, preInscripcion).subscribe((respP:any) => {
            let currentDate = new Date();
            let notificacion = new Notificacion(
              this.jefeProgramaID,
              currentDate,
              'Nueva solicitd de pasantia',
              `${this.info.nombres} te ha enviado una solicitude de pasantia para la empresa ${this.nombreEmpresa}`,
              'Administrativo' 
            );
            console.log(respP);
            this._notificacionService.postNotificacion(notificacion).subscribe((respN:any)=> {
              if(respN){
                this._notificacionService.sendNotificacionCorreo(notificacion).subscribe((respC:any)=>{
                  if(respC){
                    Swal.fire({
                      title: '¡Bien Hecho!',
                      html: `Su solicitud fue exitosa, el radicado de su solicitud es: <b> ${respP._id}</b>`,
                      icon: 'warning',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#60D89C',
                
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/mi-modalidad']);
                      }
                    });
                  }else{
                    console.log("Error garrafal");
                  }
                })
              }
            });
          });

        }, 100);

      }
    })
  }

  getVacantes() {
    this._vacantesService.getVacantes().subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });
  }

  testCorreo(){

    let currentDate = new Date();
    let notificacion = new Notificacion(
      this.jefeProgramaID,
      currentDate,
      'Nueva solicitd de pasantia',
      `${this.info.nombres} te ha enviado una solicitude de pasantia para la empresa ${this.nombreEmpresa}`,
      'Administrativo' 
    );
    this._notificacionService.sendNotificacionCorreo(notificacion).subscribe((resp:any)=>{
      if(resp){
        Swal.fire({
          title: '¡Bien Hecho!',
          text: `Se ha enviado el corrreo correctamente`,
          icon: 'success'
        });
      }else{
        Swal.fire({
          title: '¡Error!',
          text: 'Se ha producido un error al mandar el correo',
          icon: 'error',
        });
      }
    })
  }

  getVacantesEstudiante() {
    this._vacantesService.getVacantesEstudiante(this.info.programa._id).subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });
  }

  getDataInfo(data: any) {

    this.letra = data.letra;
    this.titulo = data.titulo;
    this.empresa = data.empresa.nombre;
    this.ubicacion = data.ubicacion;
    this.modalidad = data.modalidad;
    this.funciones = data.funciones;
    this.descripcion = data.descripcion;
    this.cantidad = data.cantidad;
    this.pagada = data.pagada;
    this.personaCargo = data.encargado.nombre;
    this.correo = data.encargado.correo;
    this.telefono = data.encargado.telefono;
  }

  getVacanteSelected(dato: any) {
    this.preInscripcion = dato._id;
    this.empresa = dato.empresa._id;
    this.nombreEmpresa = dato.empresa.nombre;
  }

}
