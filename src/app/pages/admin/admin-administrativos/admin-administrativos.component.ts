import { Component, OnInit } from '@angular/core';
import { 
  AdministrativoService,
  NotificacionesService, 
  RolesService,
  ProgramaService } from 'src/app/services/service.index';
import { Notificacion } from 'src/app/models/notificacion.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-administrativos',
  templateUrl: './admin-administrativos.component.html',
  styleUrls: ['./admin-administrativos.component.css']
})
export class AdminAdministrativosComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  admins:any;

  roles:any;
  programas:any;
  personRolAdd:string = "PROFESOR";

  programaAddValid = false; 

  desde: number = 0;
  campo:string = "nombres"
  pagina:number = 1;
  totalpaginas:number = 0

  constructor(
    private _notiService: NotificacionesService, 
    private _adminService:AdministrativoService,
    private _rolService:RolesService,
    private _programaService: ProgramaService
    ) { }

  ngOnInit(): void {
    this.getAdmins();
    this.getRoles();
    this.getProgramas();
  }

  getAdmins(){
    this._adminService.getAdmins(this.desde, this.campo).subscribe((resp:any)=>{
      this.admins = resp;
      this.totalpaginas = Math.ceil(this._adminService.totalAdmins/10);
    })
  }

  getRoles(){
    this._rolService.getRoles().subscribe((resp:any) => {
      this.roles = resp.roles;
      for(let i in this.roles){
        if(this.roles[i].nombre == "ESTUDIANTE"){
          this.roles.splice(i, 1);
        }if(this.roles[i].nombre == "JEFE_PROGRAMA"){
          this.roles.splice(i, 1);
        }
      }
    });
  }

  getProgramas(){
    this._programaService.getTodosProgramas().subscribe((resp:any)=>{
      this.programas = resp;
    })
  }

  getPersonRolAdd(){
    const personRolAdd = (document.getElementById("personRol")) as HTMLSelectElement;
    const selectedIndex = personRolAdd.selectedIndex;
    this.personRolAdd = this.roles[selectedIndex].nombre;
  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
  
    if (desde >= this._adminService.totalAdmins) {
      return;
    }
    if (desde <0 ) {
      return;
    }
    this.desde += valor;
    this.pagina = (this.desde/10)+1;
    this.getAdmins();
  }

  cambiarDesdeInput(valor:number){
    this.desde = (valor-1)*10;
    if(valor > this.totalpaginas){
      const inputPagina = (document.getElementById('pagina')) as HTMLInputElement;
      inputPagina.value = this.pagina.toString();
      return;
    }
    if (this.desde >= this._adminService.totalAdmins) {
      return;
    }
    if (this.desde <0 ) {
      return;
    }
    this.pagina = (this.desde/10)+1;
    this.getAdmins();
  }

  getDataBuscar(data: string){

  }

  postAdmin(f:NgForm){
    Swal.fire({
      title:"Crear "+this.personRolAdd+"?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33',
      showCloseButton:false,
    }).then((result) => {
      if(result.value){
        let admin:any;
        if(f.value.programa){
          admin = {
            identificacion: f.value.identificacion,
            nombres: f.value.nombre,
            apellidos: f.value.apellidos,
            correo: f.value.correo,
            telefono: f.value.telefono,
            programa: f.value.programa,
            rol: f.value.rol,
          }
        }else if(f.value.cargo){
          admin = {
            identificacion: f.value.identificacion,
            nombres: f.value.nombre,
            apellidos: f.value.apellidos,
            correo: f.value.correo,
            telefono: f.value.telefono,
            cargo: f.value.cargo,
            rol: f.value.rol,
          }
        }else{
          admin = {
            identificacion: f.value.identificacion,
            nombres: f.value.nombre,
            apellidos: f.value.apellidos,
            correo: f.value.correo,
            telefono: f.value.telefono,
            rol: f.value.rol,
          }
        }
        this._adminService.postAdmin(admin).subscribe((resp:any)=>{
          if(resp){
            Swal.close();
            Swal.fire({
              title: this.personRolAdd+" creado correctamente",
              icon: "success",
              showCancelButton: false,
              showConfirmButton:false,
              showCloseButton:false,
              allowEnterKey: false,
              allowEscapeKey:false,
              allowOutsideClick: false,
              timer:1000,
              timerProgressBar: true,
            }).then((result) => {
              const btnCancelarAdd = (document.getElementById("btnCancelarAdd")) as HTMLButtonElement;
              if(result.value){
                btnCancelarAdd.click()
                this.getAdmins();
              }else{
                btnCancelarAdd.click();
                this.getAdmins();
              }
            });
          }
        });
      }
    });
  }

  deleteAdmin(id:string){
    Swal.fire({
      title:"ELiminar?",
      text:"Esta operacion no se puede deshacer....estas seguro?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33',
      showCloseButton:false,
    }).then((result) => {
      if(result.value){
        this._adminService.deleteAdmin(id).subscribe((resp:any) => {
          if(resp){
            Swal.close();
            Swal.fire({
              title: "Administrador eliminado correctamente",
              icon: "success",
              showCancelButton: false,
              showConfirmButton:false,
              showCloseButton:false,
              allowEnterKey: false,
              allowEscapeKey:false,
              allowOutsideClick: false,
              timer:1000,
              timerProgressBar: true,
            }).then((result) => {
              if(result.value){
                this.getAdmins();
              }else{
                this.getAdmins();
              }
            });
          }
        });
      }
    });  
  }

}
