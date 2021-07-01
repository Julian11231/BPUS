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
  NoModalidadGuard,
  ModalidadGuard,
  InformeSieteGuard,
  InformeCatorceGuard,
  InformeFinalGuard,
  VerificaTokenGuard,
  ActaInicioGuard,
  PropuestaPasantiaGuard,
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
    ActaInicioGuard,
    ModalidadGuard,
    NoModalidadGuard,
    InformeSieteGuard,
    InformeCatorceGuard,
    InformeFinalGuard,
    VerificaTokenGuard,
    PropuestaPasantiaGuard,
    RolesService,
    AdministrativoService
  ]
})
export class ServiceModule { }
