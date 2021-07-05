import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { ModalidadService } from 'src/app/services/modalidad/modalidad.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';

@Injectable({
  providedIn: 'root'
})
export class ModalidadCreditosGuard implements CanActivate {
  constructor (private router:Router, private _modalidadService: ModalidadService, private _programaService:ProgramaService) {}

    async canActivate () {
      return true
    }
}