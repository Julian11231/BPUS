import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { Pasantia } from '../../../models/Pasantia';
import { NgForm } from '@angular/forms';
import { PasantiaTutor } from '../../../models/PasantiaTutor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutoria-pasantia',
  templateUrl: './tutoria-pasantia.component.html',
  styleUrls: ['./tutoria-pasantia.component.css']
})
export class TutoriaPasantiaComponent implements OnInit {

  idTutor: string;
  pasantias: any[];
  pasantiaSelected: any;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getPasantias();
  }

  getPasantias() {
    this.idTutor = localStorage.getItem('id');
    this._pasantiaService.getSolicitudesTutor(this.idTutor).subscribe((resp: any) => {
      this.pasantias = resp.pasantias;
      console.log(this.pasantias);
      console.log(this.idTutor);
    })
  }


  putEstadoInformes(form: NgForm, idPasantia: string) {

    Swal.fire({
      title: '¿Actualizar Pasantía?',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      if (result.value) {

        let pasantiaUpdate = new PasantiaTutor(
          form.value.estado_informe7,
          null,
          form.value.estado_informe14,
          null,
          form.value.estado_informeFinal,
          null,
          "En ejecución",
        )

        this._pasantiaService.putSolicitudTutor(idPasantia, pasantiaUpdate).subscribe();
      }
    })

  }

  getDataInfo(data: any) {
    this.pasantiaSelected = data;
  }

  getDataBuscar(data: string) {

  }

}
