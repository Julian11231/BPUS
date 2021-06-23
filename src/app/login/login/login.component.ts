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
  recordar: boolean = false;
  usuario: string;
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
    this.__loginService.login(usuario, this.recordar).subscribe((resp) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user.contraseña === ':('){
        this.router.navigate(['/cambio-contraseña']);
      }else{
        // Si se inicia un estudiante...
        if (user.codigo) {
          if (user.modalidad) {
            this.__loginService.dejaPasar();
            localStorage.setItem("reload", "true");
            this.router.navigate(['/panel-principal']);
          } else {
            this.router.navigate(['/requisitos']);
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
    // Asignamos a la variable global usuario, el usuario que obtenemos del localStorage
    this.usuario = localStorage.getItem('usuario') || '';

    // Si existe ese usuario
    if (this.usuario.length > 0) {
      this.recordar = true;
    }

    // Se eliminan los datos de inicio de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // Si es estudiante, se elimina el campo estudiante, si no...
      localStorage.removeItem('user');
    // En resumen, si el check está activado, sólo deja el dato del usuario "recordado"
  }

  showPass(){
    var showPass = (document.getElementById('showPass')) as HTMLHtmlElement;
    var inputContra = (document.getElementById('inputContra')) as HTMLInputElement;
    var showPassClass = showPass.getAttribute('class');
    if(showPassClass == 'fa fa-eye'){
      showPass.setAttribute('class', 'fa fa-eye-slash');
      inputContra.setAttribute('type', 'text');
    }else{
      showPass.setAttribute('class', 'fa fa-eye');
      inputContra.setAttribute('type', 'password');
    }
  }
}
