import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Pasantia } from '../../models/Pasantia';
import { URL_SERVICES } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';
import { PasantiaAdmin } from '../../models/PasantiaAdmin';

@Injectable({
  providedIn: 'root'
})
export class PasantiService {

  _id: string;

  constructor(public http: HttpClient, public router: Router) { }

  getSolicitudes() {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia?token=${token}`;
    return this.http.get(url);
  }

  getSolicitudesEncargado(empresa: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/empresa${empresa}?token=${token}`;
    return this.http.get(url);
  }

  getSolicitudesTutor(tutor: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/tutor${tutor}?token=${token}`;
    return this.http.get(url);
  }

  getSolicitudesAsignarJurado() {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/asignarJurado?token=${token}`;
    return this.http.get(url);
  }

  getSolicitudesJurado(tutor: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/tutor${tutor}?token=${token}`;
    return this.http.get(url);
  }

  getPasantia(id: string) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/${id}?token=${token}`;
    return this.http.get(url);
  }


  postSolicitud(id: String, solicitud: Pasantia) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/${id}?token=${token}`;

    return this.http.post(url, solicitud).pipe(map((resp: any) => {

      if (resp.ok) {
        localStorage.removeItem("estudiante");
        console.log(resp.estudianteActualizado);
        localStorage.setItem("estudiante",  JSON.stringify(resp.estudianteActualizado));
        return resp.solicitudGuardada;
      }else{
        return false;
      }

    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);

    }));

  }

  postSolicitudDirecta(idEstudiante: String, solicitud: Pasantia) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/direct/${idEstudiante}?token=${token}`;

    return this.http.post(url, solicitud).pipe(map((resp: any) => {

      if (resp.ok == true) {
        localStorage.removeItem("estudiante");
        console.log(resp.estudianteActualizado);
        localStorage.setItem("estudiante",  JSON.stringify(resp.estudianteActualizado));
        return resp.solicitudGuardada;
      }else{
        return false;
      }

    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);

    }));

  }

  cambiarEstadoEncargado(id: String, estado: boolean) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/cambiarEstado${id}?estado=${estado}&token=${token}`;

    return this.http.put(url, estado).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }else{
        return false;
      }

    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);

    }));

  }

  putSolicitudPropuesta(id: string, pasantia: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/propuesta${id}?token=${token}`;

    return this.http.put(url, pasantia).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));
  }

  putSolicitudJefe(id: string, pasantia: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/jefe${id}?token=${token}`;

    return this.http.put(url, pasantia).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));
  }

  putSolicitudTutor(id: string, pasantia: any) {

    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/pasantia/tutor${id}?token=${token}`;

    return this.http.put(url, pasantia).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));
  }

  postDocumentoPropuesta(idEstudiante: string, documento_propuesta: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_propuesta).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  putDocumentoPropuesta(idEstudiante: string, documento_actpropuesta: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_actpropuesta).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postCartaPresentacion(idEstudiante: string, carta_presentacion: FormData,) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, carta_presentacion).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoFichaAcademica(idEstudiante: string, documento_fichaAcademica: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_fichaAcademica).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return resp.pasantia;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoActInicio(idEstudiante: string, documento_actaInicio: FormData, fecha_actaInicio: string) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?fecha_actaInicio=${fecha_actaInicio}&token=${token}`;

    return this.http.put(url, documento_actaInicio).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoARL(idEstudiante: string, documento_arl: FormData, fecha_arl:string) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?fecha_arl=${fecha_arl}&token=${token}`;

    return this.http.put(url, documento_arl).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
      
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoInf7(idEstudiante: string, documento_informe7: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_informe7).pipe(map((resp: any) => {

      if (resp.ok == true) {

        Swal.fire({
          title: '¡Bien Hecho!',
          text: `Se ha enviado correctamente el documento`,
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/mi-modalidad'])
        });
      }
      return true;
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }


  postDocumentoInf14(idEstudiante: string, documento_informe14: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_informe14).pipe(map((resp: any) => {

      if (resp.ok == true) {

        Swal.fire({
          title: '¡Bien Hecho!',
          text: `Se ha enviado correctamente el documento`,
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/mi-modalidad'])
        });
      }
      return true;
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoInfFinal(idEstudiante: string, documento_informeFinal: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_informeFinal).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });

      return throwError(err);
    }));

  }

  postDocumentoAprobacionEmpresa(idEstudiante: string, documento_aprobacionEmpresa: FormData) {

    let token = localStorage.getItem('token')
    let url = `${URL_SERVICES}/upload_pasantia/${idEstudiante}?token=${token}`;

    return this.http.put(url, documento_aprobacionEmpresa).pipe(map((resp: any) => {

      if (resp.ok == true) {
        return true;
      }
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.mensaje,
        icon: 'error',
      });
      return throwError(err);
    }));

  }

}
