import { Component, OnInit } from '@angular/core';
import {RolesService} from 'src/app/services/service.index'
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  roles:any;

  constructor(public router: Router, public _rolService: RolesService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._rolService.getRoles().subscribe((resp:any) => {
      this.roles = resp.roles;
    });
  }

  editRol(rol:string){
    const btnRoles = 'btn'+rol
    var rolInput = (document.getElementById(rol)) as HTMLInputElement;
    var botones = (document.getElementById(btnRoles)) as HTMLInputElement;
    rolInput.disabled = false;
    rolInput.setAttribute('class','form-control');
    botones.setAttribute('style', 'display:block');
  }

  cancelEditRol(rol:string, rol_name: string){
    const btnRoles = 'btn'+rol
    var rolInput = (document.getElementById(rol)) as HTMLInputElement;
    var botones = (document.getElementById(btnRoles)) as HTMLInputElement;
    rolInput.disabled = true;
    rolInput.placeholder = rol_name;
    rolInput.value = rol_name;
    rolInput.setAttribute('class','form-control-plaintext');
    botones.setAttribute('style', 'display:none');
  }

  postRol(form: NgForm){
    console.log(form.value.nuevoRol);
    const rol = {nombre: form.value.nuevoRol.toUpperCase()};
    Swal.fire({
      title: 'Crear rol?',
      text:`Crearas el rol ${rol.nombre}, estás seguro?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'
    }).then((result) => {
      const btnClose = (document.getElementById('btnClose')) as HTMLButtonElement;
      if (result.value) {
        btnClose.click();
        this._rolService.postRol(rol).subscribe((resp:any)=>{
          Swal.close();
          Swal.fire({
            title: 'Rol creado correctamente',
            icon: 'success',
            timer: 1000,
            showConfirmButton:false,
            timerProgressBar: true,
          }).then((result) => {
            if (result.dismiss) {
              this.getRoles();
            }
          });
        });
      }else {
        btnClose.click();
      }
    });
  }

}
