import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InscripcionPasantiaComponent } from './solicitudes/pasantia/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './encargado/vacantes/vacantes.component';
import { ModSolicitudVacanteComponent } from './docente/mod-solicitud-vacante/mod-solicitud-vacante.component';
import { EncarSolicitudVacanteComponent } from './encargado/solicitud-vacante/solicitud-vacante.component';
import { MiSolicitudComponent } from './estudiante/mi-solicitud/mi-solicitud.component';
import { PropuestaPasantiaComponent } from './solicitudes/pasantia/propuesta-pasantia/propuesta-pasantia.component';
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
import { ActaInicioPasantiaComponent } from './estudiante/acta-inicio-pasantia/acta-inicio-pasantia.component';
import { AdminEstudiantesComponent } from './docente/admin-estudiantes/admin-estudiantes.component';
import { GestionJuradosComponent } from './docente/gestion-jurados/gestion-jurados.component';
import { JuradoPasantiaComponent } from './docente/jurado-pasantia/jurado-pasantia.component';
import { SustentacionComponent } from './estudiante/sustentacion/sustentacion.component';
//admin
import { RolesComponent } from './roles/roles.component';
import { PermisosComponent } from './permisos/permisos.component';
//Guards
import { LoginGuardGuard } from '../services/service.index';
import { EstudianteGuard } from '../services/service.index';

const pagesRoutes: Routes = [

    { path: 'modalidades', component: ModalidadesComponent, data: { titulo: 'Modalidades Disponibles' }, canActivate: [LoginGuardGuard,EstudianteGuard] },
    { path: 'solicitud-pasantia-supervisada', component: PasantiaComponent, data: { titulo: 'Solicitud Pasantía' }, canActivate: [LoginGuardGuard,EstudianteGuard] },
    { path: 'solicitud-proyecto-de-grado', component: ProyectoComponent, data: { titulo: 'Solicitud Proyecto' }, canActivate: [LoginGuardGuard,EstudianteGuard] },
    { path: 'solicitud-semillero-de-investigacion', component: SemilleroComponent, data: { titulo: 'Solicitud Semillero' }, canActivate: [LoginGuardGuard,EstudianteGuard] },
    { path: 'notificaciones', component: NotificacionesComponent, data: { titulo: 'Notificaciones' }, canActivate: [LoginGuardGuard] },
    { path: 'preinscripcion-pasantia', component: InscripcionPasantiaComponent, data: { titulo: 'Pre-Inscripción de Pasantía' },canActivate: [LoginGuardGuard,EstudianteGuard] },
    { path: 'inscripcion-directa-propuesta', component: InscripcionDirectaComponent, data: { titulo: 'Inscripción directa de la propuesta' },canActivate: [LoginGuardGuard,EstudianteGuard] },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'panel-principal', component: MainComponent, data: { titulo: 'Panel Principal' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Gestión de Empresas' } },
            { path: 'vacantes', component: VacantesComponent, data: { titulo: 'Gestión de Vacantes' } },
            { path: 'inscripcion-propuesta', component: PropuestaPasantiaComponent, data: { titulo: 'Inscripción de la Propuesta' },canActivate: [EstudianteGuard] },
            { path: 'solicitudes', component: ModSolicitudVacanteComponent, data: { titulo: 'Solicitudes Por Vacantes' } },
            { path: 'mi-modalidad', component: MiSolicitudComponent, data: { titulo: 'Seguimiento a la Modalidad' } },
            { path: 'pasantias-asignadas', component: TutoriaPasantiaComponent, data: { titulo: 'Pasantías Asignadas' } },
            { path: 'propuestas', component: PropuestasComponent, data: { titulo: 'Propuestas de Pasantía' } },
            { path: 'informe-siete', component: InformeSieteComponent, data: { titulo: 'Envío de Informe de la Semana 7' } },
            { path: 'informe-catorce', component: InformeCatorceComponent, data: { titulo: 'Envío de Informe de la Semana 14' } },
            { path: 'informe-final', component: InformeFinalComponent, data: { titulo: 'Envío de Informe Final' } },
            { path: 'solicitud-vacantes', component: EncarSolicitudVacanteComponent, data: { titulo: 'Solicitudes de vacantes' } },
            { path: 'acta-inicio', component: ActaInicioPasantiaComponent, data: { titulo: 'Acta de inicio' } },
            { path: 'gestion-estudiantes', component: AdminEstudiantesComponent, data: { titulo: 'Gestión de estudiantes' } },
            { path: 'asignacion-jurados', component: GestionJuradosComponent, data: { titulo: 'Asignación de jurados' } },
            { path: 'jurado', component: JuradoPasantiaComponent, data: { titulo: 'Jurado' } },
            { path: 'sustentacion-pasantia', component: SustentacionComponent, data: { titulo: 'Sustentación pasantia' } },
            { path: 'roles', component: RolesComponent, data: { titulo: 'Administración de roles' } },
            { path: 'permisos', component: PermisosComponent, data: { titulo: 'Administración de permisos'}},
            { path: '', redirectTo: '/panel-principal', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: false });