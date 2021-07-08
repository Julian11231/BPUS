import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InscripcionPasantiaComponent } from './solicitudes/pasantia/inscripcion-pasantia/inscripcion-pasantia.component';
import { VacantesComponent } from './encargado/vacantes/vacantes.component';
import { EncarSolicitudVacanteComponent } from './encargado/solicitud-vacante/solicitud-vacante.component';
import { MiSolicitudComponent } from './estudiante/pasantia/mi-solicitud/mi-solicitud.component';
import { PropuestaPasantiaComponent } from './solicitudes/pasantia/propuesta-pasantia/propuesta-pasantia.component';
import { TutoriaPasantiaComponent } from './docente/tutoria-pasantia/tutoria-pasantia.component';
import { PropuestasComponent } from './docente/propuestas/propuestas.component';
import { InformeCatorceComponent } from './estudiante/pasantia/informe-catorce/informe-catorce.component';
import { InformeFinalComponent } from './estudiante/pasantia/informe-final/informe-final.component';
import { InformeSieteComponent } from './estudiante/pasantia/informe-siete/informe-siete.component';
import { NotificacionesComponent} from './notificaciones/notificaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasantiaComponent } from './solicitudes/pasantia/pasantia-main/pasantia-main.component';
import { SemilleroComponent } from './solicitudes/semillero/semillero/semillero.component';
import { SolicitudProyectoComponent } from './solicitudes/proyecto/proyecto.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';
import { EmpresasComponent } from './docente/empresas/empresas.component';
import { InscripcionDirectaComponent} from './solicitudes/pasantia/inscripcion-directa/inscripcion-directa.component';
import { MainComponent } from './main/main.component';
import { ActaInicioPasantiaComponent } from './estudiante/pasantia/acta-inicio-pasantia/acta-inicio-pasantia.component';
import { AdminEstudiantesComponent } from './admin/admin-estudiantes/admin-estudiantes.component';
import { GestionJuradosComponent } from './docente/gestion-jurados/gestion-jurados.component';
import { JuradoPasantiaComponent } from './docente/jurado-pasantia/jurado-pasantia.component';
import { SustentacionComponent } from './estudiante/sustentacion/sustentacion.component';
import { AnteproyectoComponent } from './estudiante/proyecto/anteproyecto/anteproyecto.component';
import { ProyectoComponent } from './estudiante/proyecto/proyecto/proyecto.component';
import { DocumentoFinalComponent } from './estudiante/proyecto/documento-final/documento-final.component';
import { AceptarProyectoComponent } from './estudiante/proyecto/aceptar-proyecto/aceptar-proyecto.component';
//admin
import { RolesComponent } from './admin/roles/roles.component';
import { PermisosComponent } from './admin/permisos/permisos.component';
import { AdminAdministrativosComponent } from './admin/admin-administrativos/admin-administrativos.component';
import { AdminConveniosComponent } from './admin/admin-convenios/admin-convenios.component';
import { AdminEmpresasComponent } from './admin/admin-empresas/admin-empresas.component';
import { AdminModalidadComponent } from './admin/admin-modalidad/admin-modalidad.component';
import { AdminProgramaComponent } from './admin/admin-programa/admin-programa.component';
//Guards
import { ActaInicioGuard } from '../services/service.index';
import { LoginGuardGuard } from '../services/service.index';
import { PermisosGuard } from '../services/service.index';
import { ModalidadGuard } from '../services/service.index';
import { NoModalidadGuard } from '../services/service.index';
import { InformeSieteGuard } from '../services/service.index';
import { InformeCatorceGuard } from '../services/service.index';
import { InformeFinalGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/service.index';
import { PropuestaPasantiaGuard } from '../services/service.index';
import { ModalidadCreditosGuard } from '../services/service.index';

const pagesRoutes: Routes = [

    { path: 'modalidades', component: ModalidadesComponent, data: { titulo: 'Modalidades Disponibles' }, canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard] },
    { path: 'solicitud-pasantia-supervisada', component: PasantiaComponent, data: { titulo: 'Solicitud Pasantía' }, canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard, ModalidadCreditosGuard] },
    { path: 'solicitud-proyecto-de-grado', component: SolicitudProyectoComponent, data: { titulo: 'Solicitud Proyecto' }, canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard, ModalidadCreditosGuard] },
    { path: 'solicitud-semillero-de-investigacion', component: SemilleroComponent, data: { titulo: 'Solicitud Semillero' }, canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard, ModalidadCreditosGuard] },
    { path: 'notificaciones', component: NotificacionesComponent, data: { titulo: 'Notificaciones' }, canActivate: [LoginGuardGuard, ModalidadGuard, VerificaTokenGuard] },
    { path: 'preinscripcion-pasantia', component: InscripcionPasantiaComponent, data: { titulo: 'Pre-Inscripción de Pasantía' },canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard, ModalidadCreditosGuard], },
    { path: 'inscripcion-directa-propuesta', component: InscripcionDirectaComponent, data: { titulo: 'Inscripción directa de la propuesta' },canActivate: [LoginGuardGuard,PermisosGuard, VerificaTokenGuard, NoModalidadGuard, ModalidadCreditosGuard] },
    {path: "aceptar-proyecto", component:AceptarProyectoComponent, data: {titulo: 'Aceptar proyecto'}, canActivate:[PermisosGuard]},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, ModalidadGuard],
        children: [
            { path: 'panel-principal', component: MainComponent, data: { titulo: 'Panel Principal' }, canActivate:[VerificaTokenGuard] },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Gestión de Empresas' } ,canActivate: [PermisosGuard]},
            { path: 'vacantes', component: VacantesComponent, data: { titulo: 'Gestión de Vacantes' } ,canActivate: [PermisosGuard]},
            { path: 'inscripcion-propuesta', component: PropuestaPasantiaComponent, data: { titulo: 'Inscripción de la Propuesta' },canActivate: [PermisosGuard, PropuestaPasantiaGuard] },
            { path: 'mi-modalidad', component: MiSolicitudComponent, data: { titulo: 'Seguimiento a la Modalidad' } ,canActivate: [PermisosGuard, VerificaTokenGuard]},
            { path: 'pasantias-asignadas', component: TutoriaPasantiaComponent, data: { titulo: 'Pasantías Asignadas' } ,canActivate: [PermisosGuard]},
            { path: 'propuestas', component: PropuestasComponent, data: { titulo: 'Propuestas de Pasantía' } ,canActivate: [PermisosGuard]},
            { path: 'informe-siete', component: InformeSieteComponent, data: { titulo: 'Envío de Informe de la Semana 7' } ,canActivate: [PermisosGuard, InformeSieteGuard]},
            { path: 'informe-catorce', component: InformeCatorceComponent, data: { titulo: 'Envío de Informe de la Semana 14' } ,canActivate: [PermisosGuard, InformeCatorceGuard]},
            { path: 'informe-final', component: InformeFinalComponent, data: { titulo: 'Envío de Informe Final' } ,canActivate: [PermisosGuard, InformeFinalGuard]},
            { path: 'solicitud-vacantes', component: EncarSolicitudVacanteComponent, data: { titulo: 'Solicitudes de vacantes' } ,canActivate: [PermisosGuard]},
            { path: 'acta-inicio', component: ActaInicioPasantiaComponent, data: { titulo: 'Acta de inicio' } ,canActivate: [PermisosGuard, ActaInicioGuard]},
            { path: 'gestion-estudiantes', component: AdminEstudiantesComponent, data: { titulo: 'Gestión de estudiantes' } ,canActivate: [PermisosGuard]},
            { path: 'asignacion-jurados', component: GestionJuradosComponent, data: { titulo: 'Asignación de jurados' } ,canActivate: [PermisosGuard]},
            {path: "anteproyecto", component:AnteproyectoComponent, data: {titulo: 'Anteproyecto'}, canActivate:[PermisosGuard]},
            {path: "proyecto", component:ProyectoComponent, data: {titulo: 'Proyecto'}, canActivate:[PermisosGuard]},
            {path: "documento-final-proyecto", component:DocumentoFinalComponent, data: {titulo: 'Documento final proyecto'}, canActivate:[PermisosGuard]},
            { path: 'jurado', component: JuradoPasantiaComponent, data: { titulo: 'Jurado' } ,canActivate: [PermisosGuard]},
            { path: 'sustentacion-pasantia', component: SustentacionComponent, data: { titulo: 'Sustentación pasantia' } ,canActivate: [PermisosGuard]},
            { path: 'roles', component: RolesComponent, data: { titulo: 'Administración de roles' } ,canActivate: [PermisosGuard]},
            { path: 'permisos', component: PermisosComponent, data: { titulo: 'Administración de permisos'},canActivate: [PermisosGuard]},
            { path: 'admin-administrativos', component: AdminAdministrativosComponent, data: { titulo: 'Administración de administrativos'},canActivate: [PermisosGuard]},
            { path: 'admin-convenios', component: AdminConveniosComponent, data: { titulo: 'Administración de convenios'},canActivate: [PermisosGuard]},
            { path: 'admin-empresas', component: AdminEmpresasComponent, data: { titulo: 'Administración de empresas'},canActivate: [PermisosGuard]},
            { path: 'admin-modalidades', component: AdminModalidadComponent, data: { titulo: 'Administración de modalidades'},canActivate: [PermisosGuard]},
            { path: 'admin-programas', component: AdminProgramaComponent, data: { titulo: 'Administración de programas'},canActivate: [PermisosGuard]},
            { path: '', redirectTo: '/panel-principal', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: false });