import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PasantiaComponent } from './solicitudes/pasantia/pasantia-main/pasantia-main.component';
import { SemilleroComponent } from './solicitudes/semillero/semillero/semillero.component';
import { ProyectoComponent } from './solicitudes/proyecto/proyecto/proyecto.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';


// Rutas de pages
import { PAGES_ROUTES } from './pages.routes';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { EmpresasComponent } from './docente/empresas/empresas.component';
import { FormsModule } from '@angular/forms';
import { InscripcionPasantiaComponent } from './solicitudes/pasantia/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './encargado/vacantes/vacantes.component';
import { EncarSolicitudVacanteComponent } from './encargado/solicitud-vacante/solicitud-vacante.component';
import { ModSolicitudVacanteComponent } from './docente/mod-solicitud-vacante/mod-solicitud-vacante.component';
import { MiSolicitudComponent } from './estudiante/mi-solicitud/mi-solicitud.component';
import { ActaInicioComponent } from './solicitudes/pasantia/propuesta-pasantia/propuesta-pasantia.component';
import { TutoriaPasantiaComponent } from './docente/tutoria-pasantia/tutoria-pasantia.component';
import { PropuestasComponent } from './docente/propuestas/propuestas.component';
import { InformeCatorceComponent } from './estudiante/informe-catorce/informe-catorce.component';
import { InformeFinalComponent } from './estudiante/informe-final/informe-final.component';
import { InformeSieteComponent } from './estudiante/informe-siete/informe-siete.component';
import { NotificacionesComponent} from './notificaciones/notificaciones.component';
import { InscripcionDirectaComponent} from './solicitudes/pasantia/inscripcion-directa/inscripcion-directa.component';



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
    NotificacionesComponent,
    EncarSolicitudVacanteComponent,
    InscripcionDirectaComponent

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
    NotificacionesComponent,
    EncarSolicitudVacanteComponent,
    InscripcionDirectaComponent

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
