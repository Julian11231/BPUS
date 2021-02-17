import { Component, OnInit } from '@angular/core';
import { SidebarService, PasantiService } from 'src/app/services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuAdmin: any[];
  menuTutor: any[];
  menuEstudiante: any[];
  menuEncargadoEmpresa: any[];

  EstadoPreInsc: string;
  EstadoPropuesta: string;
  EstadoInforme7: string;
  EstadoInforme14: string;
  EstadoInformeFinal: string;

  noPasantia: string;
  actaInicio: string;
  informe7: string;
  informe14: string;
  informeFinal: string;

  // Inyectamos el _sidebarService para leer el menu
  constructor(public _sidebarService: SidebarService, public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getMenu()
  }

  getMenu() {

    if (localStorage.getItem('estudiante')) {
      this.menuEstudiante = this._sidebarService.menuEstudiante;

      // Falta bloquear las fases respecto a la fase anterior: En el back,
      // poner campos de estado para el acta de inicio, y los informes, en el modelo de Pasantia

      if (JSON.parse(localStorage.getItem('estudiante')).modalidad) {
        let idPasantia = JSON.parse(localStorage.getItem('estudiante'))?.modalidad._id;
        this._pasantiaService.getPasantia(idPasantia).subscribe((resp: any) => {
          console.log(resp)
          this.EstadoPreInsc = resp.pasantia?.estado;
          this.EstadoPropuesta = resp.pasantia?.estado_propuesta;
          this.EstadoInforme7 = resp.pasantia?.estado_informe7;
          this.EstadoInforme14 = resp.pasantia?.estado_informe14;
          this.EstadoInformeFinal = resp.pasantia?.estado_informeFinal;
        });

      }

      this.noPasantia = JSON.parse(localStorage.getItem('estudiante')).modalidad

    } else if (localStorage.getItem('encargadoEmpresa')){
      this.menuEncargadoEmpresa = this._sidebarService.menuEncargadoEmpresa;
    }else if (JSON.parse(localStorage.getItem('administrativo')).rol === "JEFE_PROGRAMA") {
      this.menuAdmin = this._sidebarService.menuAdmin;
    }else{
      this.menuTutor = this._sidebarService.menuTutor;
    }
  }

}
