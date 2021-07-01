import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalidadGuard implements CanActivate {
  constructor (private router:Router) {}

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