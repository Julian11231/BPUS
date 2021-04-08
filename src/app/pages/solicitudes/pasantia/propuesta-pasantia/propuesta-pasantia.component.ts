import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PasantiService, EmpresaService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

declare function init_plugins()

@Component({
  selector: 'app-acta-inicio',
  templateUrl: './propuesta-pasantia.component.html',
  styleUrls: ['./propuesta-pasantia.component.css']
})
export class PropuestaPasantiaComponent implements OnInit {

  pasantia: any;
  nombreArchivoP: string;
  nombreArchivoF: string;
  info:any;
  jefe:string;
  tituloPasantia:string;
  descripcion:string;

  documento_propuesta = new FormData();
  documento_fichaAcademica = new FormData();

  MAX_SIZE_FILE: number = 1000000;

  constructor(public _pasantiaService: PasantiService, 
              public _empresaService: EmpresaService,
              public _programaService: ProgramaService,
              public _notificacionService: NotificacionesService,
              public router: Router) { }

  ngOnInit(): void {

    init_plugins()
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
    }else{
      this.info = admin;
    }
    if(this.info.modalidad !== null){
      this.getPasantia();
    }
    this.getJefePrograma();
  }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad._id).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
    })
  }

  getFilePropuesta(file: File) {

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

      this.nombreArchivoP = file.name;
      let documento_propuesta = <File>file;
      this.documento_propuesta.append('documento_propuesta', documento_propuesta, documento_propuesta.name);
    }
  }

  getFileFicha(file: File) {

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

      this.nombreArchivoF = file.name;
      let documento_fichaAcademica = <File>file;
      this.documento_fichaAcademica.append('documento_fichaAcademica', documento_fichaAcademica, documento_fichaAcademica.name);
    }
  }

  postSolicitud() {

    let idEstudiante = this.info._id;

    Swal.fire({
      title: '¿Hacer Inscripición?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {
        let currentDate = new Date();
        let notificacion = new Notificacion(
          this.jefe,
          currentDate,
          'Nueva solicitd de pasantia',
          `${this.info.nombres} te ha enviado una solicitud de pasantia para la empresa ${this.pasantia.empresa.nombre}`,
          'Administrativo' 
        );
        this._pasantiaService.postDocumentoPropuesta(idEstudiante, this.documento_propuesta).subscribe((respDP:any) => {
          this._pasantiaService.postDocumentoFichaAcademica(idEstudiante, this.documento_fichaAcademica).subscribe((respDF:any) => {
            this._notificacionService.postNotificacion(notificacion).subscribe((respN:any)=> {
              if(respN){
                this._notificacionService.sendNotificacionCorreo(notificacion).subscribe((respC:any)=>{
                  if(respC){
                    Swal.fire({
                      title: '¡Bien Hecho!',
                      html: `Su solicitud fue eviada exitosamente, el radicado de su solicitud es: <b> ${respDF._id}</b>`,
                      icon: 'warning',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#60D89C',
                
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/']);
                      }
                    });
                  }else{
                    console.log("Error garrafal");
                  }
                })
              }
            });
          });
        });
      }
    })
  }

  getInfoPropuesta(){

    var tituloPasantia = (document.getElementById("tituloPasantia")) as HTMLInputElement;
    var descripcion = (document.getElementById("descripcion")) as HTMLInputElement;

    this.tituloPasantia = tituloPasantia.value;
    this.descripcion = descripcion.value;
    descripcion.style.overflow = 'hidden';
    descripcion.style.height = descripcion.getAttribute('data-min.rows');
    descripcion.style.height = descripcion.scrollHeight + 'px';
  }

  cleardata(){
    this.nombreArchivoP = undefined;
    this.nombreArchivoF= undefined;
    this.tituloPasantia = undefined;
    this.descripcion = undefined;
  
    this.documento_propuesta = new FormData();
    this.documento_fichaAcademica = new FormData();
  }

  getJefePrograma() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.jefe = infoPrograma.jefe._id;
    });
  }

}
