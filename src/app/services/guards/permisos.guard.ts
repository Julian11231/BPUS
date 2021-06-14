import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { PermisosService } from 'src/app/services/permisos/permisos.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  constructor (private _permisoService:PermisosService, public router:Router) {}

    async canActivate (route: ActivatedRouteSnapshot) {
    const user = JSON.parse(localStorage.getItem('user'));
    const pagina = route.url[0].path;
    const permiso:any = await this._permisoService.getPermisosPagina(pagina).toPromise();
    let user_has_permiso = false;
    for(let rol of permiso.permiso.roles){
      if(rol._id == user.rol._id){
        user_has_permiso = true;
      }
    }
    if(user_has_permiso == true){
      return true;
    }else{
      this.router.navigate(['/panel-principal'])
    }
  }

}
