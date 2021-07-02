import { Component, OnInit } from '@angular/core';
import { AdministrativoService, EstudianteService, NotificacionesService, ProgramaService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  userToAddValid = false;
  programa:string;
  jefe:any;
  docentes:any

  constructor(
    private _adminService:AdministrativoService,
    private _estudianteService: EstudianteService,
    private _programaService: ProgramaService,
    private _notificacionService: NotificacionesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProgramaInfo();
    this.getDocentes();
  }

  getProgramaInfo() {
    this._programaService.getPrograma().subscribe((resp) => {
      let infoPrograma = resp['programa'];
      this.programa = infoPrograma.nombre;
      this.jefe = infoPrograma.jefe;
    });
  }

  getDocentes(){
    this._adminService.getDocentes().subscribe((resp:any)=>{
      this.docentes = resp.docentes;
      for(let i= 0; i < this.docentes.length; i++){
        this.docentes[i].nombres = this.docentes[i].nombres+" "+this.docentes[i].apellidos;  
      }
    });
  }

  countCharsResumen(id:string, idCharNum: string) {
    const text = (document.getElementById(id) as HTMLInputElement).value;
    const strLength = text.length;
    document.getElementById(idCharNum).innerHTML = strLength + '/3000';
  }

  espandirTexarea(id:string) {
    const textarea = (document.getElementById(id) as HTMLInputElement);
    textarea.style.overflow = 'hidden';
    textarea.style.height = textarea.getAttribute('data-min.rows');
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  check(){

  }

  checkUserToAdd(){
    const buscarUser = document.getElementById("buscarUser") as HTMLInputElement
    buscarUser.value = buscarUser.value.replace(/\D/g, "");
    if(buscarUser.value.length == 11 && buscarUser.value !== this.user.codigo){
      this.userToAddValid = true
    }else{
      this.userToAddValid = false
    } 
  }

  buscarEstudiante(){
    let buscarUser = (document.getElementById("buscarUser") as HTMLInputElement).value
    buscarUser = buscarUser.replace(/\D/g, "");
    if(buscarUser.length == 11 ){
      this._estudianteService.getEstudiante(buscarUser).subscribe((resp:any)=>{
        console.log(resp);
      });
    }
  }

  mostrarBuscar(){
    const buscarEstudiante = document.getElementById("buscarEstudiante") as HTMLElement;
    const btnShowSearch = document.getElementById("btnShowSearch") as HTMLButtonElement;
    btnShowSearch.setAttribute("style", "display:none;");
    buscarEstudiante.setAttribute("style", "display:block;");
  }

  esconderBuscar(){
    const buscarEstudiante = document.getElementById("buscarEstudiante") as HTMLElement;
    const btnShowSearch = document.getElementById("btnShowSearch") as HTMLButtonElement;
    btnShowSearch.setAttribute("style", "display:block;");
    buscarEstudiante.setAttribute("style", "display:none;");
  }

}
