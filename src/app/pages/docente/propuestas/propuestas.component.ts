import { Component, OnInit } from '@angular/core';
import { PasantiService, TutoresService, NotificacionesService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/models/notificacion.model';
import { PasantiaAdmin } from 'src/app/models/PasantiaAdmin';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  pasantiaSup: any;

  user: any;
  propuestas: any[];
  tutores: any[] = [];
  tutorSelected: any;
  notas:string;
  carta_presentacion = new FormData();

  constructor(public _pasantiaService: PasantiService, public _tutoresService: TutoresService, public _notificacionService: NotificacionesService) { }

  ngOnInit(): void {
    this.user  = JSON.parse(localStorage.getItem('administrativo'));
    this.getPropuestas();
    this.getTutores();
  }

  aprobarSolicitud(form: NgForm) {
    let pasantia = new PasantiaAdmin(
      'En ejecución',
      this.tutorSelected._id,
      'Aprobada',
      form.value.notas,
    )
    this._pasantiaService.putSolicitudJefe(this.pasantiaSup._id, pasantia).subscribe((resp:any) => {
      const pdf = new PdfMakeWrapper();
      pdf.pageSize('A4');
      pdf.pageMargins(80); 
  
      let currentDate = new Date();
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let dateText = currentDate.getDate() + ' de '+ meses[currentDate.getMonth()] + ' de ' + currentDate.getFullYear();
      pdf.add(new Txt('Neiva, '+dateText).alignment('left').end);
      
      pdf.add(new Txt('Señores').margin([0, 40, 0, 0]).alignment('left').end);
      pdf.add(new Txt(this.pasantiaSup.empresa.nombre).alignment('left').end);
      pdf.add(new Txt('Neiva').alignment('left').end);
      pdf.add(new Txt('Cordial saludo.').margin([0, 30, 0, 0]).alignment('left').end);
      pdf.add(new Txt(`De acuerdo a las políticas institucionales y teniendo en cuenta que se realizó el Convenio de “Cooperación Académica para la Realización de Prácticas Académicas y Pasantías celebrado entre la Universidad Surcolombiana y ${this.pasantiaSup.empresa.nombre}", me permito presentar e informar que el estudiante cumple con los requisitos para realizar pasantías,`).margin([0, 20, 0, 0]).alignment('justify').end)
  
      pdf.add(new Table([
        [ new Txt('ÍTEM').alignment('center').end, new Txt('NOMBRE Y APELLIDOS').alignment('center').end, new Txt('CODIGO').alignment('center').end, new Txt('C.C.#').alignment('center').end],
        [ new Txt('1').alignment('center').end, new Txt(`${this.pasantiaSup.estudiante.nombres} ${this.pasantiaSup.estudiante.apellidos}`).alignment('center').end, new Txt(`${this.pasantiaSup.estudiante.codigo}`).alignment('center').end, new Txt(`${this.pasantiaSup.estudiante.identificacion}`).alignment('center').end]
      ]).margin([0, 20, 0, 0]).end);
  
      pdf.add(new Txt(`Estará supervisada por un delegado de la empresa y por docente ${this.tutorSelected.nombres} ${this.tutorSelected.apellidos}, e-mail ${this.tutorSelected.correo} Número del celular ${this.tutorSelected.telefono}, del programa, información que quedará registrada en el acta de inicio de la práctica`).margin([0, 20, 0, 0]).alignment('justify').end)
      pdf.add(new Txt('Agradeciendo la atención a la presente.').margin([0, 40, 0,0]).alignment('justify').end);
      pdf.add(new Txt('Atentamente,').margin([0, 20, 0, 70]).alignment('justify').end)
      
      // FIRMA
      var fimaJefe = (document.getElementById('firmaJefe')) as HTMLImageElement;
      var canvas = (document.createElement('canvas')) as HTMLCanvasElement;
      canvas.width = fimaJefe.width; 
      canvas.height = fimaJefe.height; 
      canvas.getContext('2d').drawImage(fimaJefe, 0, 0);
      var img = canvas.toDataURL('image/jpeg');
  
      new Img(img).build().then( img => {
        pdf.add(img);      
        pdf.add(new Txt('Ing. FERNANDO ROJAS ROJAS,').alignment('justify').end)
        pdf.add(new Txt('Jefe de los Programas de Ingeniería de Software ').alignment('justify').end)
        pdf.add(new Txt('y Tecnología en Desarrollo de Software').alignment('justify').end)
        
        pdf.create().getBlob((blop) => {
          this.carta_presentacion.append('carta_presentacion', blop, this.pasantiaSup.estudiante._id+'-carta_presentacion.pdf');
          this._pasantiaService.postCartaPresentacion(this.pasantiaSup.estudiante._id, this.carta_presentacion).subscribe((respPC:any) => {
            if(respPC){
              let currentDate = new Date();
              let notificacionE =new Notificacion(
                this.pasantiaSup.estudiante._id,
                currentDate,
                'Solicitd de pasantia aprobada',
                `Tu solicitud de pasantia ha sido aprobada, el director de tu pasantia será ${this.tutorSelected.nombres} ${this.tutorSelected.apellidos}, se adjunta la carta de presentación a la empresa`,
                'Estudiante',
                this.pasantiaSup.estudiante.correo);
              let notificacionT = new Notificacion(
                this.tutorSelected._id,
                currentDate,
                'Asignación como tutor de pasantia',
                `Te han asiganado como director de la pasantia del estudiante ${this.pasantiaSup.estudiante.nombres} ${this.pasantiaSup.estudiante.apellidos}, se adjunta el documento de la solicitud.`,
                'Administrativo',
                this.tutorSelected.correo);
              this._notificacionService.postNotificacion(notificacionE).subscribe();
              this._notificacionService.postNotificacion(notificacionT).subscribe();
              this._notificacionService.sendCartaPresentacionCorreo(this.pasantiaSup.estudiante._id, notificacionE).subscribe();
              this._notificacionService.sendPropuestaCorreo(this.pasantiaSup.estudiante._id, notificacionT).subscribe();
              Swal.fire({
                title: '¡Bien Hecho!',
                html: `Propuesta aprobada correctamente`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#60D89C',
          
              }).then((result) => {
                if (result.value) {
                  this.getPropuestas();
                }
              });
            }
          });
        });
      });
    });
  }

  rechazarSolicitud(form: NgForm){
    if(form.value.notas !== null){
      let pasantia = new PasantiaAdmin(
        "Rechazada",
        null,
        "Rechazada",
        form.value.notas,
      );
      let currentDate = new Date();
      let notificacionE =new Notificacion(
        this.pasantiaSup.estudiante._id,
        currentDate,
        'Solicitd de pasantia rechazada',
        'Tu solicitud de pasantia ha sido rechazada',
        'Estudiante' 
      );
      this._pasantiaService.putSolicitudJefe(this.pasantiaSup._id, pasantia).subscribe((resp:any)=>{
        this._notificacionService.postNotificacion(notificacionE).subscribe();
        this._notificacionService.sendNotificacionCorreo(notificacionE).subscribe();
        Swal.fire({
          html: `Propuesta rechazada correctamente`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#60D89C',
    
        }).then((result) => {
          if (result.value) {
            this.getPropuestas();
          }
        });
      });
    }
  }

  getPropuestas() {
    this._pasantiaService.getSolicitudes().subscribe((resp: any) => {
      this.propuestas = resp.pasantias;
    });
  }

  getDataInfo(data: any) {
    this.pasantiaSup = data;
    this.notas = data.notas;
  }

  getTutorSelected(){
    var selectTutor = (document.getElementById("tutorSelected")) as HTMLSelectElement;
    var selectedIndex = selectTutor.selectedIndex;

    if(selectedIndex > 0){
      selectedIndex = selectedIndex-1;
      this.tutorSelected = this.tutores[selectedIndex];
    }else{
      this.tutorSelected = "";
    }
  }

  getTutores() {
    let idPrograma = this.user.programa._id;
    this._tutoresService.getTutores(idPrograma).subscribe((resp: any) => {
      this.tutores = resp.admins;
    });
  }


  getDataBuscar(data) {

  }

}
