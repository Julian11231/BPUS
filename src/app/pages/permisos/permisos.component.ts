import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PermisosService} from 'src/app/services/service.index'

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  rol:string;
  rol_name:string;
  roles:any;

  constructor(private route: ActivatedRoute, private _permisosService: PermisosService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rol = params['rol'];
      this.rol_name = params['rol_name'];
    });
    this.getPermisos();
  }

  getPermisos(){
    this._permisosService.getPermisos().subscribe((resp:any)=>{
      this.roles = resp.permisos;
    });
  }

}
