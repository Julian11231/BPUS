import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { MainComponent } from './panel-principal/main/main.component';
import { LoginGuardGuard } from '../services/service.index';
import { PerfilComponent } from './panel-principal/perfil/perfil.component';
import { PasantiaComponent } from './solicitudes/pasantia/pasantia/pasantia.component';
import { ProyectoComponent } from './solicitudes/proyecto/proyecto/proyecto.component';
import { SemilleroComponent } from './solicitudes/semillero/semillero/semillero.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';
import { EmpresasComponent } from './panel-principal/empresas/empresas.component';
import { InscripcionPasantiaComponent } from './panel-principal/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './panel-principal/vacantes/vacantes.component';
import { ModSolicitudVacanteComponent } from './panel-principal/mod-solicitud-vacante/mod-solicitud-vacante.component';
import { MiSolicitudComponent } from './panel-principal/mi-solicitud/mi-solicitud.component';
import { ActaInicioComponent } from './panel-principal/acta-inicio/acta-inicio.component';
import { TutoriaPasantiaComponent } from './panel-principal/tutoria-pasantia/tutoria-pasantia.component';
import { PropuestasComponent } from './panel-principal/propuestas/propuestas.component';
import { InformeSieteComponent } from './panel-principal/informe-siete/informe-siete.component';
import { InformeCatorceComponent } from './panel-principal/informe-catorce/informe-catorce.component';
import { InformeFinalComponent } from './panel-principal/informe-final/informe-final.component';
import { NotificacionesComponent} from './notificaciones/notificaciones.component';



const pagesRoutes: Routes = [

    { path: 'modalidades', component: ModalidadesComponent, data: { titulo: 'Modalidades Disponibles' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-pasantia-supervisada', component: PasantiaComponent, data: { titulo: 'Solicitud Pasantía' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-proyecto-de-grado', component: ProyectoComponent, data: { titulo: 'Solicitud Proyecto' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-semillero-de-investigacion', component: SemilleroComponent, data: { titulo: 'Solicitud Semillero' }, canActivate: [LoginGuardGuard] },
    { path: 'notificaciones', component: NotificacionesComponent, data: { titulo: 'Notificaciones' }, canActivate: [LoginGuardGuard] },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'panel-principal', component: MainComponent, data: { titulo: 'Panel Principal' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Gestión de Empresas' } },
            { path: 'preinscripcion-pasantia', component: InscripcionPasantiaComponent, data: { titulo: 'Pre-Inscripción de Pasantía' } },
            { path: 'vacantes', component: VacantesComponent, data: { titulo: 'Gestión de Vacantes' } },
            { path: 'solicitudes', component: ModSolicitudVacanteComponent, data: { titulo: 'Solicitudes Por Vacantes' } },
            { path: 'mi-modalidad', component: MiSolicitudComponent, data: { titulo: 'Seguimiento a la Modalidad' } },
            { path: 'inscripcion-propuesta', component: ActaInicioComponent, data: { titulo: 'Inscripción de la Propuesta' } },
            { path: 'pasantias-asignadas', component: TutoriaPasantiaComponent, data: { titulo: 'Pasantías Asignadas' } },
            { path: 'propuestas', component: PropuestasComponent, data: { titulo: 'Propuestas de Pasantía' } },
            { path: 'informe-siete', component: InformeSieteComponent, data: { titulo: 'Envío de Informe de la Semana 7' } },
            { path: 'informe-catorce', component: InformeCatorceComponent, data: { titulo: 'Envío de Informe de la Semana 14' } },
            { path: 'informe-final', component: InformeFinalComponent, data: { titulo: 'Envío de Informe Final' } },
            { path: '', redirectTo: '/panel-principal', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });