import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

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
