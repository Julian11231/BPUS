import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuAdmin: any[];
  menuEstudiante: any[];

  EstadoPreInsc: string;
  noPasantia: string;
  actaInicio: string;
  informe7: string;
  informe14: string;
  informeFinal: string;

  // Inyectamos el _sidebarService para leer el menu
  constructor(public _sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getMenu()
  }

  getMenu() {

    if (localStorage.getItem('estudiante')) {
      this.menuEstudiante = this._sidebarService.menuEstudiante;

      // Falta bloquear las fases respecto a la fase anterior: En el back,
      // poner campos de estado para el acta de inicio, y los informes, en el modelo de Pasantia
      this.EstadoPreInsc = JSON.parse(localStorage.getItem('estudiante')).modalidad.estado;
      this.noPasantia = JSON.parse(localStorage.getItem('estudiante')).modalidad

    } else {
      this.menuAdmin = this._sidebarService.menuAdmin;
    }

  }

  /*let estudiante = JSON.parse(localStorage.getItem("estudiante"))
if (estudiante.modalidad.modalidad === idModPasantia) {
  this.menuPasantia = this._sidebarService.menuPasantia;
}*/

}
