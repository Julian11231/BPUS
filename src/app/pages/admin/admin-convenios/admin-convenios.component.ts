import { Component, OnInit } from '@angular/core';
import { ConvenioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-admin-convenios',
  templateUrl: './admin-convenios.component.html',
  styleUrls: ['./admin-convenios.component.css']
})
export class AdminConveniosComponent implements OnInit {

  convenios: any;
  desde:number = 0;
  convenioSelected:any;

  constructor(private _convenioService:ConvenioService) { }

  ngOnInit(): void {
    this.getConvenios();
  }

  getConvenios(){
    this._convenioService.getConvenios(this.desde).subscribe((resp:any) => {
      console.log(resp)
      this.convenios = resp.convenios;
    });
  }

  getDataPut(dato: any) {
    this.convenioSelected = dato;
  }

  getDataBuscar(data: string){

  }

}
