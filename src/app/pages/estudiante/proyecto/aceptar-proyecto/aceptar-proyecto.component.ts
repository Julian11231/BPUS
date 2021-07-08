import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceptar-proyecto',
  templateUrl: './aceptar-proyecto.component.html',
  styleUrls: ['./aceptar-proyecto.component.css']
})
export class AceptarProyectoComponent implements OnInit {

  info = JSON.parse(localStorage.getItem("user"));
  proyecto = JSON.parse(localStorage.getItem("modalidad"));

  fichaValid = false;
  documento_fichaAcademica = new FormData();
  MAX_SIZE_FILE: number = 1000000;

  constructor() { }

  ngOnInit(): void {
  }

  activeTab(tab: string) {
    const activeTab = document.getElementById(tab);
    const problemaTab = document.getElementById('problemaTab');
    const alcanceTab = document.getElementById('alcanceTab');
    const metodologiaTab = document.getElementById('metodologiaTab');
    problemaTab.setAttribute('class', 'nav-link text-body');
    alcanceTab.setAttribute('class', 'nav-link text-body');
    metodologiaTab.setAttribute('class', 'nav-link text-body');
    activeTab.setAttribute('class', 'nav-link activeTab font-weight-bold');
  }

  getFileFicha(file: File) {
    if (file.size > this.MAX_SIZE_FILE) {
      const fileFicha = document.getElementById("fileFicha") as HTMLInputElement;
      const labelFicha = document.getElementById("labelFicha") as HTMLInputElement;
      this.documento_fichaAcademica = new FormData();
      this.fichaValid = false;
      Swal.fire({
        title: '¡Lo Sentimos!',
        html: `<p> El archivo: <b>${file.name}</b>, supera el 1 MB</p>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then(() => {
        fileFicha.value = "";
        labelFicha.innerHTML = "Click aquí para subir la ficha academica";
        labelFicha.setAttribute("style","");
      });
    } else {
      const labelFicha = document.getElementById("labelFicha") as HTMLInputElement;
      labelFicha.setAttribute("style","color: #8F141B; font-weight: bold;");
      labelFicha.innerHTML = file.name;
      let documento_fichaAcademica = <File>file;
      this.documento_fichaAcademica.append('documento_fichaAcademica', documento_fichaAcademica, documento_fichaAcademica.name);
      this.fichaValid = true;
    }
  }

}
