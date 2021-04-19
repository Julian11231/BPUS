import { Component, OnInit } from '@angular/core';
import { SidebarService, PasantiService } from 'src/app/services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuJefePrograma: any[];
  menuTutor: any[];
  menuEstudiante: any[];
  menuEncargadoEmpresa: any[];
  menuAdmin: any[];

  pasantia:any;
  diff:any

  // Inyectamos el _sidebarService para leer el menu
  constructor(public _sidebarService: SidebarService, public _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    this.getMenu()
  }

  getMenu() {

    if (localStorage.getItem('estudiante')) {
      this.menuEstudiante = this._sidebarService.menuEstudiante;
      if (JSON.parse(localStorage.getItem('estudiante')).modalidad) {
        let idPasantia = JSON.parse(localStorage.getItem('estudiante'))?.modalidad._id;
        this._pasantiaService.getPasantia(idPasantia).subscribe((resp: any) => {
          this.pasantia = resp.pasantia;
          if(this.pasantia.fecha_actaInicio){
            let currentDate = new Date();
            let fechaInicio = new Date(Date.parse(this.pasantia.fecha_actaInicio));
            this.diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          }
        });

      }
    } else if (localStorage.getItem('encargadoEmpresa')){
      this.menuEncargadoEmpresa = this._sidebarService.menuEncargadoEmpresa;
    }else if (JSON.parse(localStorage.getItem('administrativo')).rol === "JEFE_PROGRAMA") {
      this.menuJefePrograma = this._sidebarService.menuJefePrograma;
    }else if (JSON.parse(localStorage.getItem('administrativo')).rol === "ADMIN") {
      let idPasantia = JSON.parse(localStorage.getItem('administrativo'))?.modalidad._id;
      this._pasantiaService.getPasantia(idPasantia).subscribe((resp: any) => {
        this.pasantia = resp.pasantia;
      });
        this.menuAdmin = this._sidebarService.menuAdmin;
    }else{
      this.menuTutor = this._sidebarService.menuTutor;
    }
  }

}
