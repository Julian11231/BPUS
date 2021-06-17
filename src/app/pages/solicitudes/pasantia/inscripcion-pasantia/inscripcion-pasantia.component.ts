import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VacantesService, PasantiService, NotificacionesService,ProgramaService } from 'src/app/services/service.index';
import { Pasantia } from 'src/app/models/Pasantia';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-inscripcion-pasantia',
  templateUrl: './inscripcion-pasantia.component.html',
  styleUrls: ['./inscripcion-pasantia.component.css']
})
export class InscripcionPasantiaComponent implements OnInit {

  info = JSON.parse(localStorage.getItem('user'));
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
  lineaInvestigacion:string;
  pagada: string;
  personaCargo: any;
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
    this._programaService.getPrograma().subscribe((resp:any) => {
      this.jefeProgramaID = resp.programa.jefe._id;
    });
    this.getVacantes();
  }

  getVacantes() {
    this._vacantesService.getVacantesEstudiante(this.info.programa).subscribe((resp: any) => {
      this.vacantes = resp.vacantes;
    });
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
        let preInscripcion = new Pasantia(
          null,
          this.preInscripcion,
          form.value.eps,
          this.lineaInvestigacion
        )
        this._pasantiaService.postSolicitud(idEstudiante, preInscripcion).subscribe(async (respP:any) => {
          let currentDate = new Date();
          let notificacion = new Notificacion(
            this.personaCargo._id,
            currentDate,
            'Nueva solicitd de pasantia',
            `${this.info.nombres} te ha enviado una solicitud de pasantia para la empresa ${this.nombreEmpresa}`,
            'Administrativo',
            this.personaCargo.correo 
          );
          await this._notificacionService.sendNotificacionCorreo(notificacion).toPromise();
          await this._notificacionService.postNotificacion(notificacion).toPromise()

          Swal.fire({
            title: '¡Bien Hecho!',
            html: 'Su solicitud fue enviada exitosamente',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            allowEscapeKey:false,
            allowEnterKey: false,
            allowOutsideClick: false,
            timer: 1000,
            timerProgressBar: true,
          }).then((result) => {
            if (result.value) {
              localStorage.setItem("reload", "true");
              this.router.navigate(['/']);
            }else{
              localStorage.setItem("reload", "true");
              this.router.navigate(['/']);
            }
          });
        });
      }
    })
  }

  getDataInfo(data: any) {
    this.titulo = data.titulo;
    this.empresa = data.convenio.empresa.nombre;
    this.ubicacion = data.ubicacion;
    this.modalidad = data.modalidad;
    this.funciones = data.funciones;
    this.descripcion = data.descripcion;
    this.cantidad = data.cantidad;
    this.pagada = data.pagada;
    this.personaCargo = data.convenio.encargado;
    this.correo = data.convenio.encargado.correo;
    this.telefono = data.convenio.encargado.telefono;
  }

  getVacanteSelected(dato: any) {
    var radio1 = (document.getElementById("radio1")) as HTMLInputElement;
    var radio2 = (document.getElementById("radio2")) as HTMLInputElement;
    var radio3 = (document.getElementById("radio3")) as HTMLInputElement;
    if(radio1.checked){
      this.lineaInvestigacion = radio1.value;
    }else if(radio2.checked){
      this.lineaInvestigacion = radio2.value;
    }else if(radio3.checked){
      this.lineaInvestigacion = radio3.value;
    }
    this.preInscripcion = dato._id;
    this.empresa = dato.convenio.empresa._id;
    this.nombreEmpresa = dato.convenio.empresa.nombre;
  }

}
