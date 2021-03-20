import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pasantia } from 'src/app/models/Pasantia';
import { PasantiService, EmpresaService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

declare function init_plugins()

@Component({
  selector: 'app-acta-inicio',
  templateUrl: './inscripcion-directa.component.html'
})
export class InscripcionDirectaComponent implements OnInit {

  pasantia: string;
  nombreArchivoP: string;
  nombreArchivoF: string;
  info:any;
  nombreEmpresa:string;
  jefe:string;
  empresas: any;
  eps:string;
  tituloPasantia:string;
  idEmpresa:string;

  documento_propuesta = new FormData();
  documento_fichaAcademica = new FormData();

  MAX_SIZE_FILE: number = 1000000

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
    this.getEmpresas();
    this.getJefePrograma();
  }

  getEmpresas(){
    this._empresaService.getEmpresas().subscribe((resp:any) => {
      this.empresas = resp.empresas;
      console.log(this.empresas);
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

        setTimeout(() => {

          let inscripcion = new Pasantia(
            this.idEmpresa,
            null,
            this.eps,
            this.tituloPasantia
          )

          this._pasantiaService.postSolicitudDirecta(idEstudiante, inscripcion).subscribe((respP:any) => {
            let currentDate = new Date();
            let notificacion = new Notificacion(
              this.jefe,
              currentDate,
              'Nueva solicitd de pasantia',
              `${this.info.nombres} te ha enviado una solicitud de pasantia para la empresa ${this.nombreEmpresa}`,
              'Administrativo' 
            );
            this._pasantiaService.postDocumentoPropuesta(idEstudiante, this.documento_propuesta).subscribe((resp:any) => {
              this._pasantiaService.postDocumentoFichaAcademica(idEstudiante, this.documento_fichaAcademica).subscribe((resp:any) => {
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
          });

        }, 100);

      }
    })
  }

  getInfoPropuesta(){
    var selectEmpresas = (document.getElementById("mySelect")) as HTMLSelectElement;
    var eps = (document.getElementById("eps")) as HTMLSelectElement;
    var tituloPasantia = (document.getElementById("tituloPasantia")) as HTMLSelectElement;
    var selectedIndex = selectEmpresas.selectedIndex;
    if(selectedIndex > 0){
      selectedIndex = selectedIndex-1;
      this.nombreEmpresa = this.empresas[selectedIndex].nombre;
      this.idEmpresa =  this.empresas[selectedIndex]._id;
    }else{
      this.nombreEmpresa = '';
      this.idEmpresa = '';
    }
    var epsSelected = eps.value;
    var tituloPasantiaText = tituloPasantia.value;
    this.tituloPasantia = tituloPasantiaText;
    this.eps = epsSelected;
  }

  cleardata(){
    this.nombreArchivoP = undefined;
    this.nombreArchivoF= undefined;
    this.nombreEmpresa = undefined;
    this.eps = undefined;
    this.tituloPasantia = undefined;
    this.idEmpresa = undefined;
  
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
