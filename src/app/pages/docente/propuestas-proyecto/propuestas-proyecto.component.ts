import { Component, OnInit } from '@angular/core';
import { NotificacionesService, ProyectoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { NgForm } from '@angular/forms';

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

  constructor(private _proyectoService: ProyectoService, 
    private _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    this.getPropuestas();
  }

  getPropuestas() {
    this._proyectoService.getProyectoEnviados(this.user.programa).subscribe((resp: any) => {
      this.proyectos = resp.proyectos;
    });
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const problemaTab = document.getElementById('problemaTab');
    const alcanceTab = document.getElementById('alcanceTab');
    const metodologiaTab = document.getElementById('metodologiaTab');
    problemaTab.setAttribute('class', 'nav-link text-body');
    alcanceTab.setAttribute('class', 'nav-link text-body');
    metodologiaTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  rechazarSolicitud(form: NgForm){

  }

  aprobarSolicitud(form: NgForm){
    
  }

  getDataInfo(proyecto:any){
    this.proyectoSelected = proyecto;
  }

  getDataBuscar(valor: string){
    
  }

}
