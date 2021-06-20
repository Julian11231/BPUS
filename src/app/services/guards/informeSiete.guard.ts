import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { PasantiService } from 'src/app/services/pasantia/pasanti.service';

@Injectable({
  providedIn: 'root'
})
export class InformeSieteGuard implements CanActivate {
  constructor (private _pasantiaService:PasantiService, private router:Router) {}

    async canActivate () {
        const user = JSON.parse(localStorage.getItem('user'));
        const resp:any = await this._pasantiaService.getPasantia(user.modalidad).toPromise();
        const pasantia = resp.pasantia;  
        let currentDate = new Date();
        let fechaInicio = new Date(Date.parse(pasantia.fecha_actaInicio));
        const diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
        if((diff < 7 && pasantia.estado !== 'En ejecución' && pasantia.estado_informe7) || pasantia.estado_informe7 !== 'Ajustar'){
          this.router.navigate(["/"]);
        }else{
          return true;
        }
    }
}