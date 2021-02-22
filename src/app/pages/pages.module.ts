import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { MainComponent } from './panel-principal/main/main.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './panel-principal/perfil/perfil.component';
import { PasantiaComponent } from './solicitudes/pasantia/pasantia/pasantia.component';
import { SemilleroComponent } from './solicitudes/semillero/semillero/semillero.component';
import { ProyectoComponent } from './solicitudes/proyecto/proyecto/proyecto.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';


// Rutas de pages
import { PAGES_ROUTES } from './pages.routes';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { EmpresasComponent } from './panel-principal/empresas/empresas.component';
import { FormsModule } from '@angular/forms';
import { InscripcionPasantiaComponent } from './panel-principal/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './panel-principal/vacantes/vacantes.component';
import { ModSolicitudVacanteComponent } from './panel-principal/mod-solicitud-vacante/mod-solicitud-vacante.component';
import { MiSolicitudComponent } from './panel-principal/mi-solicitud/mi-solicitud.component';
import { ActaInicioComponent } from './panel-principal/acta-inicio/acta-inicio.component';
import { TutoriaPasantiaComponent } from './panel-principal/tutoria-pasantia/tutoria-pasantia.component';
import { PropuestasComponent } from './panel-principal/propuestas/propuestas.component';
import { InformeCatorceComponent } from './panel-principal/informe-catorce/informe-catorce.component';
import { InformeFinalComponent } from './panel-principal/informe-final/informe-final.component';
import { InformeSieteComponent } from './panel-principal/informe-siete/informe-siete.component';
import { NotificacionesComponent} from './notificaciones/notificaciones.component';


@NgModule({
  declarations: [
    PagesComponent,
    MainComponent,
    PerfilComponent,
    PasantiaComponent,
    ProyectoComponent,
    SemilleroComponent,
    ModalidadesComponent,
    EmpresasComponent,
    InscripcionPasantiaComponent,
    VacantesComponent,
    ModSolicitudVacanteComponent,
    MiSolicitudComponent,
    ActaInicioComponent,
    TutoriaPasantiaComponent,
    PropuestasComponent,
    InformeSieteComponent,
    InformeCatorceComponent,
    InformeFinalComponent,
    NotificacionesComponent

  ],
  exports: [
    CommonModule,
    PagesComponent,
    MainComponent,
    PerfilComponent,
    PasantiaComponent,
    ProyectoComponent,
    SemilleroComponent,
    ModalidadesComponent,
    VacantesComponent,
    ModSolicitudVacanteComponent,
    MiSolicitudComponent,
    ActaInicioComponent,
    TutoriaPasantiaComponent,
    PropuestasComponent,
    InformeSieteComponent,
    InformeCatorceComponent,
    InformeFinalComponent,
    NotificacionesComponent

  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    PipesModule,
    BrowserModule,
    FormsModule
  ]
})
export class PagesModule { }
