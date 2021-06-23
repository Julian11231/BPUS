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
      return this.verificaRenueva(payload.exp);
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }

  }


  verificaRenueva(fechaExp:number): Promise<boolean>{

    return new Promise((resolve,reject)=>{
    
      let tokenExp = new Date(fechaExp*1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime()+(1*60*60*1000));

      if (tokenExp.getTime()>ahora.getTime()) {
        resolve(true);
      }else{
        this._loginService.renuevaToken().subscribe(()=>{
          resolve(true);
        },()=>{
          reject(false);
          this.router.navigate(['/login']);
        });
      }
    });

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