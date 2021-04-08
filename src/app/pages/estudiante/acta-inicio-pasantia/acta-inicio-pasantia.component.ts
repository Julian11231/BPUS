import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PasantiService, EmpresaService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acta-inicio-pasantia',
  templateUrl: './acta-inicio-pasantia.component.html',
  styleUrls: ['./acta-inicio-pasantia.component.css']
})


export class ActaInicioPasantiaComponent implements OnInit {

  pasantia: any;
  info:any;
  jefe:string;

  nombreArchivoARL: string;
  nombreArchivoActIni: string;

  documento_ARL = new FormData();
  fecha_arl:string;
  documento_ActInicio = new FormData();
  fecha_artInicio:string;

  MAX_SIZE_FILE: number = 1000000

  constructor(public _pasantiaService: PasantiService, 
    public _empresaService: EmpresaService,
    public _programaService: ProgramaService,
    public _notificacionService: NotificacionesService,
    public router: Router) { }

  ngOnInit(): void {
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
  }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad._id).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
      if(this.pasantia.fecha_arl !== null && typeof(this.pasantia.fecha_arl) !== 'undefined'){
        const pipe = new DatePipe('en-US');
        this.fecha_arl = pipe.transform(this.pasantia.fecha_arl, 'yyyy-MM-dd');
      }
    })
  }

  getFileARL(file: File) {
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
      this.nombreArchivoARL = file.name;
      let documento_ARL = <File>file;
      this.documento_ARL.append('documento_arl', documento_ARL, documento_ARL.name);
    }
  }

  getFechaARL(){
    var fechaarl = (document.getElementById('fechaARL')) as HTMLInputElement;
    this.fecha_arl = fechaarl.value;
  }

  uploadARL(){
    this._pasantiaService.postDocumentoARL(this.info._id, this.documento_ARL, this.fecha_arl).subscribe((resp:any)=>{
      if(resp){
        Swal.fire({
          title: '¡Bien hecho!',
          html: `<p> Se ha enviado correctamente el documento.</p>`,
          icon: 'success',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          location.reload()
        });
      }
    });
  }
  
  getFechaActInicio(){
    var fechactInicio = (document.getElementById('fechaARL')) as HTMLInputElement;
    this.fecha_artInicio = fechactInicio.value;
  }

  uploadActInicio(){
    this._pasantiaService.postDocumentoActInicio(this.info._id, this.documento_ActInicio, this.fecha_artInicio).subscribe((resp:any)=>{
      if(resp){
        Swal.fire({
          title: '¡Bien hecho!',
          html: `<p> Se ha enviado correctamente el documento.</p>`,
          icon: 'success',
          confirmButtonText: 'Ok',
          showCancelButton: false,
          confirmButtonColor: '#60D89C',
        }).then(() => {
          location.reload()
        });
      }
    });
  }

  getFileActInicio(file: File) {
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
      this.nombreArchivoActIni = file.name;
      let documento_ActInicio = <File>file;
      this.documento_ActInicio.append('documento_actaInicio', documento_ActInicio, documento_ActInicio.name);
    }
  }

}
