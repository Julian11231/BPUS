import { Component, OnInit } from '@angular/core';
import { PasantiService, TutoresService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiaAdmin } from 'src/app/models/PasantiaAdmin';
import { Pasantia } from '../../../models/Pasantia';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  pasantiaSup: any;

  user: any;
  propuestas: any[];
  tutores: any[] = [];
  tutor: any[] = [];
  notas:string;

  constructor(public _pasantiaService: PasantiService, public _tutoresService: TutoresService) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const admin = JSON.parse(localStorage.getItem('administrativo'));
    if(estudiante){
      this.user = estudiante;
    }else{
      this.user = admin;
    }
    this.getPropuestas();
    this.getTutores();
  }

  aprobarSolicitud(form: NgForm) {
    console.log(form.value);
    let pasantia = new PasantiaAdmin(
      'En ejecución',
      form.value.tutor,
      'Aprobada',
      form.value.notas,
    )
    console.log(pasantia);
    this._pasantiaService.putSolicitud(this.pasantiaSup._id, pasantia).subscribe();
  }

  rechazarSolicitud(form: NgForm){
    if(form.value.notas !== null){
      let pasantia = new PasantiaAdmin(
        "Rechazada",
        null,
        "Rechazada",
        form.value.notas,
      )
      this._pasantiaService.putSolicitud(this.pasantiaSup._id, pasantia).subscribe();
    }
  }

  getPropuestas() {
    this._pasantiaService.getSolicitudes().subscribe((resp: any) => {
      this.propuestas = resp.pasantias;
      console.log(resp);

    });
  }

  getDataInfo(data: any) {
    this.pasantiaSup = data;
    this.notas = data.notas;
  }

  getTutores() {
    let idPrograma = this.user.programa._id;
    this._tutoresService.getTutores(idPrograma).subscribe((resp: any) => {
      this.tutores = resp.admins;
    });
  }


  getDataBuscar(data) {

  }

}
