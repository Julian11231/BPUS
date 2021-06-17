import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("reload")){
      localStorage.removeItem("reload");
      location.reload();
    }
  }

}
