import { Component, OnInit } from '@angular/core';
import {RolesService} from 'src/app/services/service.index'
import { Router} from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  roles:any;

  constructor(public router: Router, public _rolService: RolesService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._rolService.getRoles().subscribe((resp:any) => {
      this.roles = resp.roles;
    });
  }

  goPermisos(rol:string, rol_name:string) {
    this.router.navigate(['/permisos'], { queryParams: { rol: rol, rol_name: rol_name } });
  }

}
