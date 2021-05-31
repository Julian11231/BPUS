import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EstudianteGuard implements CanActivate {
  constructor ( public router: Router, private route: ActivatedRoute,) {}

  canActivate() {
    const user = JSON.parse(localStorage.getItem("user"));
    var url = window.location.href.toString().split(window.location.host)[1];
    url = url.split('/#/')[1];
    console.log(url);
    return true;
  }
}
