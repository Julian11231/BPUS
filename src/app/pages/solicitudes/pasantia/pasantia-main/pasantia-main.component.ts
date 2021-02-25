import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasantia',
  templateUrl: './pasantia-main.component.html',
  styleUrls: ['./pasantia-main.component.css']
})
export class PasantiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  setIdPasantia() {

    let idModPasantia = "5eb57a1f54d7ac345dc39ca5";
    localStorage.setItem("modalidadSelect", idModPasantia);

  }


}
