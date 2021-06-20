import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  RequisitosService,
  LoginService,
  ProgramaService,
  ModalidadService,
} from 'src/app/services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css'],
})
export class RequisitosComponent implements OnInit {
  // Se capturan los elementos html que van a cambiar
  icon: any = document.getElementsByClassName('fa');
  btnContinuar: any = document.getElementsByClassName('btn');
  info = JSON.parse(localStorage.getItem("user"));
  // Inyectamos todos los servicios que necesitamos
  constructor(
    public router: Router,
    public _requisitosService: RequisitosService,
    public _programaService: ProgramaService,
    public _loginService: LoginService,
    public _modalidadesService: ModalidadService
  ) { }

  ngOnInit() {
    init_plugins();
    if(this.info !== null && this.info.contraseña !== ":("){
    // Se llama la función confirmarRequisitos y se le pasa los elementos capturados
    this._programaService.getPrograma();
    this._requisitosService.confirmarRequisitos(this.btnContinuar, this.icon);
    // Cargamos el porcentaje de los créditos cumplidos por el estudiante.
    this._modalidadesService.calcularPorcentaje();
    }else{
      this.router.navigate(["/login"]);
    }
  }
  // Función que se llama cuando se da click en el botón "continuar"
  continuar() {
    this._loginService.dejaPasar();
  }
}
