import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  SharedService,
  LoginService,
  SidebarService,
  RequisitosService,
  LoginGuardGuard,
  ProgramaService,
  ModalidadService,
  EmpresaService,
  VacantesService,
  PasantiService,
  TutoresService,
  EncargadoEmpresaService,
  ConvenioService,
  NotificacionesService,
  EstudianteService,
  PermisosGuard,
  ModalidadGuard,
  InformeSieteGuard,
  InformeCatorceGuard,
  InformeFinalGuard,
  RolesService,
  AdministrativoService
} from './service.index'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers: [
    LoginService,
    SharedService,
    SidebarService,
    RequisitosService,
    LoginGuardGuard,
    ProgramaService,
    ModalidadService,
    EmpresaService,
    VacantesService,
    PasantiService,
    TutoresService,
    EncargadoEmpresaService,
    ConvenioService,
    NotificacionesService,
    EstudianteService,
    PermisosGuard,
    ModalidadGuard,
    InformeSieteGuard,
    InformeCatorceGuard,
    InformeFinalGuard,
    RolesService,
    AdministrativoService
  ]
})
export class ServiceModule { }
