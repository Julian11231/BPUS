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
      // Si se inicia un estudiante...
      if (localStorage.getItem('estudiante')) {
        if (JSON.parse(localStorage.getItem('estudiante')).modalidad) {

          this.__loginService.dejaPasar();
          this.router.navigate(['/panel-principal']);

        } else {
          this.router.navigate(['/requisitos']);
        }

      } else {
        this.router.navigate(['/panel-principal']);
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
    localStorage.removeItem('id');

    // Si es estudiante, se elimina el campo estudiante, si no...
    if (localStorage.getItem('estudiante')) {
      localStorage.removeItem('estudiante');
    } else {
      localStorage.removeItem('administrativo');
    }

    // En resumen, si el check está activado, sólo deja el dato del usuario "recordado"
  }
}
