import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InscripcionPasantiaComponent } from './solicitudes/pasantia/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './encargado/vacantes/vacantes.component';
import { ModSolicitudVacanteComponent } from './docente/mod-solicitud-vacante/mod-solicitud-vacante.component';
import { EncarSolicitudVacanteComponent } from './encargado/solicitud-vacante/solicitud-vacante.component';
import { MiSolicitudComponent } from './estudiante/mi-solicitud/mi-solicitud.component';
import { ActaInicioComponent } from './solicitudes/pasantia/propuesta-pasantia/propuesta-pasantia.component';
import { TutoriaPasantiaComponent } from './docente/tutoria-pasantia/tutoria-pasantia.component';
import { PropuestasComponent } from './docente/propuestas/propuestas.component';
import { InformeCatorceComponent } from './estudiante/informe-catorce/informe-catorce.component';
import { InformeFinalComponent } from './estudiante/informe-final/informe-final.component';
import { InformeSieteComponent } from './estudiante/informe-siete/informe-siete.component';
import { NotificacionesComponent} from './notificaciones/notificaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasantiaComponent } from './solicitudes/pasantia/pasantia-main/pasantia-main.component';
import { SemilleroComponent } from './solicitudes/semillero/semillero/semillero.component';
import { ProyectoComponent } from './solicitudes/proyecto/proyecto/proyecto.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';
import { EmpresasComponent } from './docente/empresas/empresas.component';
import { InscripcionDirectaComponent} from './solicitudes/pasantia/inscripcion-directa/inscripcion-directa.component';
import { MainComponent } from './main/main.component';
import { LoginGuardGuard } from '../services/service.index';




const pagesRoutes: Routes = [

    { path: 'modalidades', component: ModalidadesComponent, data: { titulo: 'Modalidades Disponibles' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-pasantia-supervisada', component: PasantiaComponent, data: { titulo: 'Solicitud Pasantía' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-proyecto-de-grado', component: ProyectoComponent, data: { titulo: 'Solicitud Proyecto' }, canActivate: [LoginGuardGuard] },
    { path: 'solicitud-semillero-de-investigacion', component: SemilleroComponent, data: { titulo: 'Solicitud Semillero' }, canActivate: [LoginGuardGuard] },
    { path: 'notificaciones', component: NotificacionesComponent, data: { titulo: 'Notificaciones' }, canActivate: [LoginGuardGuard] },
    { path: 'preinscripcion-pasantia', component: InscripcionPasantiaComponent, data: { titulo: 'Pre-Inscripción de Pasantía' },canActivate: [LoginGuardGuard] },
    { path: 'inscripcion-directa-propuesta', component: InscripcionDirectaComponent, data: { titulo: 'Inscripción directa de la propuesta' },canActivate: [LoginGuardGuard] },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'panel-principal', component: MainComponent, data: { titulo: 'Panel Principal' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Gestión de Empresas' } },
            { path: 'vacantes', component: VacantesComponent, data: { titulo: 'Gestión de Vacantes' } },
            { path: 'inscripcion-propuesta', component: ActaInicioComponent, data: { titulo: 'Inscripción de la Propuesta' },canActivate: [LoginGuardGuard] },
            { path: 'solicitudes', component: ModSolicitudVacanteComponent, data: { titulo: 'Solicitudes Por Vacantes' } },
            { path: 'mi-modalidad', component: MiSolicitudComponent, data: { titulo: 'Seguimiento a la Modalidad' } },
            { path: 'pasantias-asignadas', component: TutoriaPasantiaComponent, data: { titulo: 'Pasantías Asignadas' } },
            { path: 'propuestas', component: PropuestasComponent, data: { titulo: 'Propuestas de Pasantía' } },
            { path: 'informe-siete', component: InformeSieteComponent, data: { titulo: 'Envío de Informe de la Semana 7' } },
            { path: 'informe-catorce', component: InformeCatorceComponent, data: { titulo: 'Envío de Informe de la Semana 14' } },
            { path: 'informe-final', component: InformeFinalComponent, data: { titulo: 'Envío de Informe Final' } },
            { path: 'solicitud-vacantes', component: EncarSolicitudVacanteComponent, data: { titulo: 'Solicitudes de vacantes' } },
            { path: '', redirectTo: '/panel-principal', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });