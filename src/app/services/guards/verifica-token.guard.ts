import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _loginService:LoginService, public router:Router){}

  canActivate(): Promise<boolean> | boolean {

    let token = this._loginService.token;
    try {
      let payload=JSON.parse(atob(token.split('.')[1]));
      let expirado = this.expirado(payload);
      if (expirado) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

  expirado(fechaExp:number){
    let ahora = new Date().getTime()/1000;
    if (fechaExp<ahora) {
      return true;
    } else {
      return false;
    }
  }
}