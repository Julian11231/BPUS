import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService, AdministrativoService } from 'src/app/services/service.index'; 

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {

  info = JSON.parse(localStorage.getItem("user"));
  invalidPassword:boolean = true;
  passwordsMatch:boolean = false;

  constructor(private router: Router, 
    private _estudianteService: EstudianteService,
    private _administrativoService: AdministrativoService) { }

  ngOnInit(): void {
    if(this.info.contraseña == ":)"){
      this.router.navigate(['/panel-principal']);
    }
  }

  cambiarClave(){
    const newPassword = (document.getElementById('newPassword')) as HTMLInputElement;
    if(this.info.codigo){
      this._estudianteService.cambiarClave(this.info._id, newPassword.value).subscribe((resp:any) => {
        this.router.navigate(['/requisitos']);
      });
    }else{
      this._administrativoService.cambiarClave(this.info._id, newPassword.value).subscribe((resp:any) => {
        this.router.navigate(['/panel-principal']);
      })
    }

  }

  checkPassword(){
    const newPassword = (document.getElementById('newPassword')) as HTMLInputElement;
    const invalidPassword = (document.getElementById('invalidPassword')) as HTMLInputElement;
    if (newPassword.value.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$')) {
      this.invalidPassword = false;
      invalidPassword.setAttribute('style','display: none');
    } else if(newPassword.value == ''){
      this.invalidPassword = true;
      invalidPassword.setAttribute('style','display: none');
    }else{
      this.invalidPassword = true;
      invalidPassword.setAttribute('style','color: red; display: block');
    }
  }

  matchPasswords(){
    const newPassword = (document.getElementById('newPassword')) as HTMLInputElement;
    const confirmNewPassword = (document.getElementById('confirmNewPassword')) as HTMLInputElement;
    const mismatch = (document.getElementById('mismatch')) as HTMLInputElement;
    if(newPassword.value === confirmNewPassword.value){
      this.passwordsMatch = true;
      mismatch.setAttribute('style','display: none');
    }else if(newPassword.value == '' || confirmNewPassword.value == ''){
      this.passwordsMatch = false;
      mismatch.setAttribute('style','display: none');
    }else{
      mismatch.setAttribute('style','color: red; display:block');
      this.passwordsMatch = false;
    }
  }

  showpassword(inputId: string, iconId: string) {
    const password = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      icon.setAttribute('class', 'fa fa-eye-slash');
    } else {
      password.setAttribute('type', 'password');
      icon.setAttribute('class', 'fa fa-eye');
    }
  }

}
