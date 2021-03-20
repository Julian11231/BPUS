import { Component, OnInit } from '@angular/core';
import { PasantiService, TutoresService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PasantiaAdmin } from '../../../models/PasantiaAdmin';
import { Pasantia } from 'src/app/models/Pasantia';


@Component({
  selector: 'app-mod-solicitud-vacante',
  templateUrl: './solicitud-vacante.component.html',
  styleUrls: ['./solicitud-vacante.component.css']
})
export class EncarSolicitudVacanteComponent implements OnInit {

  info: any;
  solicitudes: any[];
  programa: string;
  vacanteSelected: any;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    //const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    const encargado = JSON.parse(localStorage.getItem('encargadoEmpresa'));
    this.info = encargado;
    this.programa = this.info.programa._id;
    this.getSolicitudes();
    //this.vacanteSelected = this.solicitudes[0];
  }

  aprobarSolicitud() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Vas a aprobar la vacante de '+ this.vacanteSelected.estudiante.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aprobar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.value) {
        this._pasantiaService.cambiarEstadoEncargado(this.vacanteSelected._id, true).subscribe((resp:any) => {
          console.log(resp);
          if(resp){
            Swal.close();
            Swal.fire({
              title: 'Aprobada correctamente',
              icon: 'success',
              timer: 2000,
              showConfirmButton:false,
              timerProgressBar: true,
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                this.getSolicitudes();
              }
            })
          }
        });
      }
    })
  }

  rechazarSolicitud(form: NgForm){
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Vas a rechazar la vacante de '+ this.vacanteSelected.estudiante.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aprobar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.value) {
        this._pasantiaService.cambiarEstadoEncargado(this.vacanteSelected._id, false).subscribe((resp:any) => {
          console.log(resp);
          if(resp){
            Swal.close();
            Swal.fire({
              title: 'Rechazada correctamente',
              icon: 'success',
              timer: 2000,
              showConfirmButton:false,
              timerProgressBar: true,
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                this.getSolicitudes();
              }
            })
          }
        });
      }
    })
  }

  getSolicitudes() {

    this._pasantiaService.getSolicitudesEncargado(this.info.empresa._id).subscribe((resp: any) => {
      this.solicitudes = resp.pasantias;
      console.log(this.solicitudes);
      this.vacanteSelected = this.solicitudes[0];
    });
  }

  getDataInfo(data: any) {
    this.vacanteSelected = data;
  }



  getDataBuscar(data) {

  }

}
