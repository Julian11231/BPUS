import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICES } from '../../config/config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Definimos una variable global "token" para después asignarle un valor
  token: string;

  constructor(public router: Router, public http: HttpClient) {
  }

  // Esta función nos va a servir para cuando el estudiante está en la página de requisitos
  // y si intenta entrar al panel principal, no lo deje. Ya que la ruta va a estar protegida
  // por el loginGuard que confirma si está el token en el local storage --> Al hacer click
  // En el botón continuar, se llama esta función y se guarda el token en el local storage
  dejaPasar() {
    console.log(this.token);
    localStorage.setItem('token', this.token);
  }


  // Devuelve una bandera (true/false) confirmando si el usuario está logueado (tiene el token
  // en el local storage)
  logueado() {
    this.token = localStorage.getItem("token");
    return (this.token) ? true : false;
  }

  // Redirije a la pagina del login
  logOut() {
    this.router.navigate(['/login']);
  }

  // En esta función se llama al servicio del login del backend
  // Recibe un usuario de tipo Usuario (Modelo), y una bandera que nos indica que el check de
  // recordarme está activado

  login(usuario: Usuario, recordar: boolean = false) {

    // Definimos la url del servicio que queremos llamar
    let url = URL_SERVICES + '/login';

    // Enviamos los datos. Es un observable, entonces tendrá una respuesta
    return this.http.post(url, usuario).pipe(map((resp: any) => {
        if (resp['estudiante']) {
          // Si el check está activado, se guarda el usuario en el localStorage
          if (recordar === true) {
            localStorage.setItem('usuario', resp.estudiante.usuario);
          } else {
            localStorage.removeItem('usuario')
          }
          // Guardamos toda la info del estudiante y el id
          localStorage.setItem('user', JSON.stringify(resp.estudiante));
          // Se le asigna el token de la respuesta a la variable token
          this.token = resp.token;
          console.log(this.token);
          // Es el mismo procedimiento anterior(Administrativo)
        } else if(resp['administrativo']) {
          // Si el check está activado, se guarda el usuario en el localStorage
          if (recordar === true) {
            localStorage.setItem('usuario', resp.administrativo.usuario);
          } else {
            localStorage.removeItem('usuario');
          }
          // Se guarde la info del administrativo, el id y el token al local sotrage
          // NOTA: Como nos podemos dar cuenta, aquí no se asigna el token del admin a la variable
          // token, esto debido a que el administrativo no va a pasar por la página de requisitos
          // y necesita el token a penas se loguee en el local storae
          localStorage.setItem('user', JSON.stringify(resp.administrativo));
          localStorage.setItem('token', resp.token);
        }
        return true;
      }),
        // Si existen errores (status code de la petición), los capturamos y los ponemos en un
        // sweetalert
        catchError((err) => {
          Swal.fire({
            title: '¡Error!',
            text: err.error.mensaje,
            icon: 'error',
            confirmButtonColor: '#8F141B'
          });
          return throwError(err);
        }));
  }
}
