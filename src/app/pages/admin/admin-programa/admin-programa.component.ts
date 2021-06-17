import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProgramaService, AdministrativoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-admin-programa',
  templateUrl: './admin-programa.component.html',
  styleUrls: ['./admin-programa.component.css']
})
export class AdminProgramaComponent implements OnInit {

  programas:any;
  docentes:any
  desde: number = 0;
  pagina:number = 1;
  totalpaginas:number = 0

  constructor(private _adminService:AdministrativoService, private _programaService:ProgramaService) { }

  ngOnInit(): void {
    this.getProgramas();
    this.getDocentes();
  }

  getProgramas(){
    this._programaService.getProgramas(this.desde).subscribe((resp:any)=>{
      this.programas = resp;
      console.log(resp);
      this.totalpaginas = Math.ceil(this._programaService.totalprogramas/10);
    })
  }

  getDocentes(){
    this._adminService.getDocentes().subscribe((resp:any)=>{
      this.docentes = resp.docentes;
      for(let i= 0; i < this.docentes.length; i++){
        this.docentes[i].nombres = this.docentes[i].nombres+" "+this.docentes[i].apellidos;  
      }
    });
  }

  postPrograma(f:NgForm){

  }

  putPrograma(){

  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
  
    if (desde >= this._programaService.totalprogramas) {
      return;
    }
    if (desde <0 ) {
      return;
    }
    this.desde += valor;
    this.pagina = (this.desde/10)+1;
    this.getProgramas();
  }

  cambiarDesdeInput(valor:number){
    this.desde = (valor-1)*10;
    if(valor > this.totalpaginas){
      const inputPagina = (document.getElementById('pagina')) as HTMLInputElement;
      inputPagina.value = this.pagina.toString();
      return;
    }
    if (this.desde >= this._programaService.totalprogramas) {
      return;
    }
    if (this.desde <0 ) {
      return;
    }
    this.pagina = (this.desde/10)+1;
    this.getProgramas();
  }

  getDataBuscar(data: string){

  }

}
