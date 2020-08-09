import { Component, OnInit } from '@angular/core';
import { LoginService, ProgramaService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  // No estoy muy seguro si se usa, pero lo dejo por si acaso :v
  constructor(
    public _loginService: LoginService,
    public _programaService: ProgramaService
  ) {}

  ngOnInit(): void {
    init_plugins();
  }
}
