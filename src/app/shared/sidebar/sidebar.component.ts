import { Component, OnInit } from '@angular/core';
import { PasantiService } from 'src/app/services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  menu:any;
  menuEstudiante:boolean = false;
  pasantia:any;
  diff:any

  // Inyectamos el _sidebarService para leer el menu
  constructor(private _pasantiaService: PasantiService) { }

  ngOnInit(): void {
    if (this.user.codigo) {
      this.menuEstudiante = true;
      if (this.user.modalidad) {
        let idPasantia = this.user.modalidad;
        this._pasantiaService.getPasantia(idPasantia).subscribe((resp: any) => {
          this.pasantia = resp.pasantia;
          if(this.pasantia.fecha_actaInicio){
            let currentDate = new Date();
            let fechaInicio = new Date(Date.parse(this.pasantia.fecha_actaInicio));
            this.diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()) ) /(1000 * 60 * 60 * 24 * 7));
          }
        });
      }
    }else{
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }
  }

}
