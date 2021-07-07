import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // la variable recordar pertenece al check "recordarme", por defecto será falso
  usuario: string;
  mostrarcontra: boolean = false;
  // Inyectamos el servicio del login, y el Router
  constructor(public __loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    // Siempre cuando se cargue el login, va a activar la función
    this.logout();
  }

  // Se crea la función que se activará cuando se presione el botón de iniciar sesión
  ingresar(form: NgForm) {
    // Se crea una variable de tipo Usuario
    let usuario = new Usuario(form.value.usuario, form.value.contrasena);

    // Llamamos a la función login del servicio Login y le pasamos el usuario y la variable recordar
    this.__loginService.login(usuario).subscribe((resp) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user.contraseña === ':('){
        this.router.navigate(['/cambio-contraseña']);
      }else{
        // Si se inicia un estudiante...
        if (user.codigo) {
          if (user.modalidad) {
            if(user.onModel === "Proyecto"){
              if(user._id === user.modalidad.estudiante){
                localStorage.removeItem("user");
                user.modalidad = user.modalidad._id;
                localStorage.setItem("user",  JSON.stringify(user));
                localStorage.setItem("reload", "true");
                this.router.navigate(['/panel-principal']);
              }else if(user._id === user.modalidad.estudiante2){
                if(user.modalidad.aprobacionEstudiante2 == true){
                  localStorage.removeItem("user");
                  user.modalidad = user.modalidad._id;
                  localStorage.setItem("user",  JSON.stringify(user));
                  localStorage.setItem("reload", "true");
                  this.router.navigate(['/panel-principal']);
                }else{
                  this.router.navigate(['/xd']);
                }
              }else if(user._id === user.modalidad.estudiante3){
                if(user.modalidad.aprobacionEstudiante3 == true){
                  localStorage.removeItem("user");
                  user.modalidad = user.modalidad._id;
                  localStorage.setItem("user",  JSON.stringify(user));
                  
                  localStorage.setItem("reload", "true");
                  this.router.navigate(['/panel-principal']);
                }else{
                  this.router.navigate(['/xd']);
                }
              }
            }else{
              localStorage.removeItem("user");
              user.modalidad = user.modalidad._id;
              localStorage.setItem("user",  JSON.stringify(user));
              localStorage.setItem("reload", "true");
              this.router.navigate(['/panel-principal']);
            }
          } else {
            this.router.navigate(['/modalidades']);
          }
        } else{
          localStorage.setItem("reload", "true");
          this.router.navigate(['/panel-principal']);
        }
      }
    });
  }

  // Función para eliminar los datos de sesión
  logout() {
    localStorage.clear();
  }

  showPass(){
    const inputContra = (document.getElementById('inputContra')) as HTMLInputElement;
    if(this.mostrarcontra){
      inputContra.setAttribute('type', 'text');
    }else{
      inputContra.setAttribute('type', 'password');
    }
  }
}
