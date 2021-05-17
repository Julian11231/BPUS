import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiService, TutoresService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { PasantiaAsignarJurado } from '../../../models/pasantiaAsignarJurado.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-jurados',
  templateUrl: './gestion-jurados.component.html',
  styleUrls: ['./gestion-jurados.component.css']
})
export class GestionJuradosComponent implements OnInit {

  user: any;
  fecha:Date;
  fechamin:string;
  fechamax:string;
  pasantias: any[];
  pasantiaSelected: any;
  jurados: any
  jurado1:string = "";
  jurado2:string = "";

  constructor(public _pasantiaService: PasantiService, public _tutoresService: TutoresService, public _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    this.user  = JSON.parse(localStorage.getItem('administrativo'));
    this.fecha =  new Date();
    const pipe = new DatePipe('en-US');
    var mes:string; var dia:string;
    var year = this.fecha.getFullYear()+1;
    var month = this.fecha.getMonth()+1;
    var date = this.fecha.getDate();
    if(month < 10){
      mes = '0'+month.toString();
    }else{
      mes = month.toString();
    }
    if(date < 10){
      dia = '0'+date.toString();
    }else{
      dia = date.toString();
    }
    this.fechamin = pipe.transform(this.fecha, 'yyyy-MM-dd');
    this.fechamax = year+'-'+mes+'-'+dia;
    console.log(this.fechamin)
    console.log(this.fechamax)
    this.getPasantias();
    this.getJurados();
  }

  getPasantias() {
    this._pasantiaService.getSolicitudesAsignarJurado().subscribe((resp: any) => {
      this.pasantias = resp.pasantias;
      let currentDate = new Date();
      const pipe = new DatePipe('en-US');
      for (let i = 0; i < this.pasantias.length; i++) {
        if(this.pasantias[i].fecha_actaInicio){
          let fechaInicio = new Date(Date.parse(this.pasantias[i].fecha_actaInicio));
          this.pasantias[i].fecha_actaInicio =  pipe.transform(fechaInicio, 'dd-MM-yyyy')
          let diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          this.pasantias[i].semanas = Math.floor(diff);
        }
      }
    })
  }

  checkJurados(){
    var errorJurados = (document.getElementById('errorJurados')) as HTMLElement;
    if(this.jurado1 !== "" && this.jurado2 !== "" && this.jurado1 === this.jurado2){
      errorJurados.setAttribute('style','display:block; color: red;');
    }else{
      errorJurados.setAttribute('style','display:none;');
    }
  }

  AsignarJurados(idPasantia:string, f:NgForm){
    Swal.fire({
      title: '¿Asignar jurados?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {

        let pasantia = new PasantiaAsignarJurado(this.jurado1,this.jurado2,f.value.fecha, f.value.lugar);
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var jurado1Nombre:string; var jurado2Nombre:string;
        var fecha = f.value.fecha.split(/\D/);
        var sustentacion_fecha =  new Date(fecha[0], --fecha[1], fecha[2]);

        var selectJurado1 = (document.getElementById("jurado1")) as HTMLSelectElement;
        var selectJurado2 = (document.getElementById("jurado2")) as HTMLSelectElement;
        var selectedIndex1 = selectJurado1.selectedIndex; var selectedIndex2 = selectJurado2.selectedIndex;  
        selectedIndex1 = selectedIndex1-1; selectedIndex2 = selectedIndex2-1;

        jurado1Nombre = this.jurados[selectedIndex1].nombres+' '+this.jurados[selectedIndex1].apellidos;
        jurado2Nombre = this.jurados[selectedIndex2].nombres+' '+this.jurados[selectedIndex2].apellidos;

        this._pasantiaService.asignarJurado(idPasantia, pasantia).subscribe((resp:any) => {
          const currentDate = new Date();

          let notificacionE =new Notificacion(
            this.pasantiaSelected.estudiante._id,
            currentDate,
            'Te han asignado los jurados de tu pasantia',
            `${jurado1Nombre} y ${jurado2Nombre} serán los jurados de tu pasantia, se realizara en ${f.value.lugar} el ${sustentacion_fecha.getDate()} de ${meses[sustentacion_fecha.getMonth()]} del ${sustentacion_fecha.getFullYear()}`,
            'Estudiante',
            this.pasantiaSelected.estudiante.correo);

          let notificacionJ1 =new Notificacion(
            this.jurado1,
            currentDate,
            'Te han asignado como jurado de una pasantia',
            `Has sido asignado como jurado de la pasantia del estudiante ${this.pasantiaSelected.estudiante.nombres} ${this.pasantiaSelected.estudiante.apellidos}`,
            'Administrativo',
            this.jurados[selectedIndex1].correo);
            
          let notificacionJ2 =new Notificacion(
            this.jurado2,
            currentDate,
            'Te han asignado como jurado de una pasantia',
            `Has sido asignado como jurado de la pasantia del estudiante ${this.pasantiaSelected.estudiante.nombres} ${this.pasantiaSelected.estudiante.apellidos}`,
            'Administrativo',
            this.jurados[selectedIndex2].correo);

          this._notificacionService.postNotificacion(notificacionE).subscribe();
          this._notificacionService.postNotificacion(notificacionJ1).subscribe();
          this._notificacionService.postNotificacion(notificacionJ2).subscribe();
          this._notificacionService.sendNotificacionCorreo(notificacionE).subscribe();
          this._notificacionService.sendArchivosJurado(this.pasantiaSelected.estudiante._id, notificacionJ1).subscribe();
          this._notificacionService.sendArchivosJurado(this.pasantiaSelected.estudiante._id, notificacionJ2).subscribe();

          Swal.fire({
            title: '¡Bien hecho!',
            text: 'Jurados asignados correctamente',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'Aceptar',
            showCancelButton: false,
            confirmButtonColor: '#60D89C',
          }).then((result) => {
            if (result.value || result.dismiss) {
              const btnCerrar = (document.getElementById('btnCerrar')) as HTMLElement;
              btnCerrar.click();
              this.getPasantias();
            }
          });
        });
      }
    });
  }

  getJurados() {
    let idPrograma = this.user.programa._id;
    this._tutoresService.getTutores(idPrograma).subscribe((resp: any) => {
      this.jurados = resp.admins;
    });
  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

  clearDataInfo(){
    this.jurado1 = "";
    this.jurado2 = "";
    var errorJurados = (document.getElementById('errorJurados')) as HTMLElement;
    errorJurados.setAttribute('style','display:none;');
  }

}
