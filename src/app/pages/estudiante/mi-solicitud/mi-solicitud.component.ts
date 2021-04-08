import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pasantia } from '../../../models/Pasantia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-solicitud',
  templateUrl: './mi-solicitud.component.html',
  styleUrls: ['./mi-solicitud.component.css']
})
export class MiSolicitudComponent implements OnInit {

  pasantiaSup: Pasantia;

  info: any;
  pasantia: any;

  constructor(public _pasantiaService: PasantiService, public router: Router) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.info = estudiante;
    }else{
      this.info = admin;
    }
    if(this.info.modalidad !== null){
      this.getPasantia();
    }else{
      this.router.navigate(['/modalidades'])
    }
  }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad._id).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
    })
  }

}
