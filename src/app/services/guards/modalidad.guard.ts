import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { PermisosService } from 'src/app/services/permisos/permisos.service';

@Injectable({
  providedIn: 'root'
})
export class ModalidadGuard implements CanActivate {
  constructor (private _permisoService:PermisosService, private router:Router) {}

    canActivate () {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.codigo){
          if(user.modalidad){
            return true;
          }else{
            this.router.navigate(['/login']);
          }
        }else if(user){
          return true;
        }else{
          this.router.navigate(['/login']);
        }
    }
}