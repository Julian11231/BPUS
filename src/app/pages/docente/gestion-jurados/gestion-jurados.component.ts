import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiService, ProyectoService, AdministrativoService, NotificacionesService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { PasantiaAsignarJurado } from '../../../models/pasantiaAsignarJurado.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-jurados',
  templateUrl: './gestion-jurados.component.html',
  styleUrls: ['./gestion-jurados.component.css']
})
export class GestionJuradosComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  
  fechamin:string;
  fechamax:string;

  pasantias: any[];
  pasantiaSelected: any;
 
  proyectos: any[];
  proyectoSelected:any;
  
  jurados: any
  juradoPasantia1:string = "";
  juradoPasantia2:string = "";
  juradoProyecto1:string = "";
  juradoProyecto2:string = "";

  constructor(private _pasantiaService: PasantiService,
    private _proyectoService: ProyectoService,
    private _tutoresService: AdministrativoService,
    private _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    const fecha =  new Date();
    const pipe = new DatePipe('en-US');
    let max = fecha.getTime()+(1000*60*60*24*33);
    let min = fecha.getTime()+(1000*60*60*24*3);
    let fechamax = new Date(max);
    let fechamin = new Date(min)
    this.fechamin = pipe.transform(fechamin, 'yyyy-MM-dd');
    this.fechamax = pipe.transform(fechamax, 'yyyy-MM-dd');
    this.getPasantias();
    this.getJurados();
    this.getProyectos();
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const pasantiaTab = document.getElementById('pasantiaTab');
    const proyectoTab = document.getElementById('proyectoTab');
    pasantiaTab.setAttribute('class', 'nav-link text-body');
    proyectoTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  getProyectos() {
    this._proyectoService.getProyectosAsignarJurados(this.user.programa).subscribe((resp: any) => {
      this.proyectos = resp.proyectos;
    });
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

  checkJuradosPasantia(){
    var errorJuradosPasantia = (document.getElementById('errorJuradosPasantia')) as HTMLElement;
    if(this.juradoPasantia1 !== "" && this.juradoPasantia2 !== "" && this.juradoPasantia1 === this.juradoPasantia2){
      errorJuradosPasantia.setAttribute('style','display:block; color: red;');
    }else{
      errorJuradosPasantia.setAttribute('style','display:none;');
    }
  }

  checkJuradosProyecto(){
    var errorJuradosProyecto = (document.getElementById('errorJuradosProyecto')) as HTMLElement;
    if(this.juradoProyecto1 !== "" && this.juradoProyecto2 !== "" && this.juradoProyecto1 === this.juradoProyecto2){
      errorJuradosProyecto.setAttribute('style','display:block; color: red;');
    }else{
      errorJuradosProyecto.setAttribute('style','display:none;');
    }
  }

  AsignarJuradosPasantia(idPasantia:string, f:NgForm){
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

        let pasantia = new PasantiaAsignarJurado(this.juradoPasantia1,this.juradoPasantia2,f.value.fecha, f.value.lugar);
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var jurado1Nombre:string; var jurado2Nombre:string;
        var fecha = f.value.fecha.split(/\D/);
        var sustentacion_fecha =  new Date(fecha[0], --fecha[1], fecha[2]);

        var selectJurado1 = (document.getElementById("juradoPasantia1")) as HTMLSelectElement;
        var selectJurado2 = (document.getElementById("juradoPasantia2")) as HTMLSelectElement;
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
            this.juradoPasantia1,
            currentDate,
            'Te han asignado como jurado de una pasantia',
            `Has sido asignado como jurado de la pasantia del estudiante ${this.pasantiaSelected.estudiante.nombres} ${this.pasantiaSelected.estudiante.apellidos}`,
            'Administrativo',
            this.jurados[selectedIndex1].correo);
            
          let notificacionJ2 =new Notificacion(
            this.juradoPasantia2,
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
            timer: 1000,
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

  AsignarJuradosProyecto(f:NgForm){

  }

  getJurados() {
    let idPrograma = this.user.programa;
    this._tutoresService.getTutores(idPrograma).subscribe((resp: any) => {
      this.jurados = resp.admins;
    });
  }

  getPasantiaSelected(data: any) {
    this.pasantiaSelected = data;
  }

  getProyectoSelected(data: any) {
    this.proyectoSelected = data;
  }

  clearDataPasantia(){
    this.juradoPasantia1 = "";
    this.juradoPasantia2 = "";
    var errorJuradosPasantia = (document.getElementById('errorJuradosPasantia')) as HTMLElement;
    errorJuradosPasantia.setAttribute('style','display:none;');
  }

  clearDataProyecto(){
    this.juradoProyecto1 = "";
    this.juradoProyecto2 = "";
    var errorJuradosProyecto = (document.getElementById('errorJuradosProyecto')) as HTMLElement;
    errorJuradosProyecto.setAttribute('style','display:none;');
  }

}
