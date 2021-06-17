import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuJefePrograma: any = [
    {
      titulo: 'Proyecto de Grado',
      icono: 'fa fa-book',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Semilleros',
      icono: 'mdi mdi-school',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Pasantía',
      icono: 'fa fa-briefcase',
      submenu: [
        { titulo: 'Gestión de Empresas', url: '/empresas' },
        { titulo: 'Propuestas de Pasantía', url: '/propuestas' },
        { titulo: 'Asignación de jurados', url: '/asignacion-jurados' },
        { titulo: 'Tutorías Asignadas', url: '/pasantias-asignadas' },
        { titulo: 'Jurado', url: '/jurado' }
      ]
    }
  ];

  menuAdmin: any = [
    { titulo: 'Administrativos', icono: 'fa fa-user', url: '/admin-administrativos'},
    { titulo: 'Convenios', icono: 'fa fa-briefcase', url: '/admin-convenios' },
    { titulo: 'Empresas', icono: 'fa fa-building', url: '/admin-empresas' },
    { titulo: 'Modalidades', icono: 'fa fa-graduation-cap', url: '/admin-modalidades' },
    { titulo: 'Programas', icono: 'fa fa-university', url: '/admin-programas' },
    { titulo: 'Roles', icono: 'fa fa-group', url: '/roles' },
    { titulo: 'Permisos', icono: 'fa fa-gears', url: '/permisos' }
  ];

  menuEncargadoEmpresa: any = [
    {
      titulo: 'Gestión Vacantes',
      icono: 'fa fa-briefcase',
      submenu: [
        { titulo: 'Gestión de vacantes', url: '/vacantes' },
      ]
    },
    {
      titulo: 'Solicitudes',
      icono: 'fa fa-briefcase',
      submenu: [
        { titulo: 'Gestión de solicitudes', url: '/solicitud-vacantes' },
      ]
    }
  ];

  menuTutor: any = [
    {
      titulo: 'Proyecto de Grado',
      icono: 'fa fa-book',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Semilleros',
      icono: 'mdi mdi-school',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Pasantías',
      icono: 'fa fa-briefcase',
      submenu: [
        { titulo: 'Tutorías Asignadas', url: '/pasantias-asignadas' },
        { titulo: 'Jurado', url: '/jurado' }
      ]
    }
  ];

  menuEstudiante: any[] = [
    {
      titulo: 'Pre-Inscripción',
      icono: 'fa fa-check-square-o',
      submenu: [
        { titulo: 'Enviar Pre-Inscripción', url: '/preinscripcion-pasantia' },
      ]
    },
    {
      titulo: 'Acta de Inicio',
      icono: 'fa fa-book',
      submenu: [
        { titulo: 'Enviar Acta de Inicio', url: '/dashboard' },

      ]
    },
    {
      titulo: 'Informe - Semana 7',
      icono: 'fa fa-file-pdf-o',
      submenu: [
        { titulo: 'Enviar Informe', url: '/dashboard' },]
    },
    {
      titulo: 'Informe - Semana 14',
      icono: 'fa fa-file-text-o',
      submenu: [
        { titulo: 'Enviar Informe', url: '/dashboard' },
      ]
    },
    {
      titulo: 'Informe Final',
      icono: 'fa fa-file-word-o',
      submenu: [
        { titulo: 'Enviar Informe', url: '/dashboard' },
      ]
    },
    {
      titulo: 'Estado de mi Modalidad',
      icono: 'fa fa-info-circle',
      submenu: [
        { titulo: 'Var Estado', url: '/mi-modalidad' }
      ]
    }
  ]

  constructor() { }
}
