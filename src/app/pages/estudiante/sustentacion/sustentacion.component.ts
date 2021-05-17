import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sustentacion',
  templateUrl: './sustentacion.component.html',
  styleUrls: ['./sustentacion.component.css']
})
export class SustentacionComponent implements OnInit {

  info: any;
  pasantia: any;

  constructor(public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    this.info = estudiante;
    this.getPasantia();
  }

  getPasantia() {
    this._pasantiaService.getPasantia(this.info.modalidad._id).subscribe((resp: any) => {
      this.pasantia = resp.pasantia;
      console.log(this.pasantia);
      const pipe = new DatePipe('en-US');
      let currentDate = new Date();
      if(this.pasantia.sustentacion_fecha){
        let sustentacion_fecha = new Date(Date.parse(this.pasantia.sustentacion_fecha));
        this.pasantia.sustentacion_fecha =  pipe.transform(sustentacion_fecha, 'dd/MM/yyyy');
      }
    });
  }

}
