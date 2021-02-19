import { Injectable } from '@angular/core';
import { Programa } from '../../models/programa.model';
import { ProgramaService } from '../programa/programa.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitosService {

  // Definimos las variables que vamos a utilizar
  estudiante: String;
  creditosAprob: any;
  modGrado: Number;

  programa: Programa;

  bien: String = 'fa-check'
  mal: String = 'fa-times'

  constructor( public _programaService: ProgramaService ) { }

  // Creamos una función que calcula el 50% de los cŕeditos totales de la carrera
  calculoPorcentaje( creditos:any ){
    return creditos * 0.5;
  }


  // Hacemos la función que se encarga de confirmar los requisitos para cada uno de los programas
  confirmarRequisitos( btnContinuar:any, icon:any ){
    
    // Obtenemos la info de cada programa del estudiante
    this._programaService.getPrograma().subscribe( (resp:any) => {
      
      this.programa = resp.programa;

      // Tomamos del localStorage y lo separamos en variables
      this.estudiante = JSON.parse(localStorage.getItem('estudiante'));
      let admin = JSON.parse(localStorage.getItem('administrativo'));
      if(this.estudiante){
        this.estudiante = this.estudiante;
      }else if(admin && admin.rol == "ADMIN"){
        this.estudiante = admin;
      }
      this.creditosAprob = this.estudiante['creditos_aprobados'];
      this.modGrado = this.estudiante['modGrado'];
    
      // Seleccionamos el elemento html que necesitamos
      btnContinuar = btnContinuar[1];
      
      let iconCred = icon[0];
      let iconMod = icon[1];
      
      // Se calcula el 50% de los créditos de cada programa
      let porcentaje = this.calculoPorcentaje(this.programa.creditos_totales);
    
    
      //Si supera ese 50%...
      if (this.creditosAprob > porcentaje){
        // Indicamos qué icono se quiere (check)
        iconCred.classList.add(this.bien);
        // Se le asigna un id, para que el archivo css le cambie el estilo(verde)
        iconCred.setAttribute('id', "icon-check")
      
      // Si no supera...
      } else {
        // Indicamos qué icono se quiere (X)
        iconCred.classList.add(this.mal);
        // Se le asigna un id, para que el archivo css le cambie el estilo(rojo)
        iconCred.setAttribute('id', "icon-mal");  
      }
    
    
      // Se repite el procedimiento anterior, pero en este caso con la modGrado
      if (this.modGrado > 3) {
        iconMod.classList.add(this.bien);
        iconMod.setAttribute('id', "icon-check")
      } else {
        iconMod.classList.add(this.mal);
        iconMod.setAttribute('id', "icon-mal");  
      }
    
    
      // Si cumple ambos requisitos...
      if (this.modGrado > 3 && this.creditosAprob > porcentaje){
        // Habilita el botón para dejarlo continuar
        btnContinuar.disabled = false;  
      }
    
      });
  
  }

}


