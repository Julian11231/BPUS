import { Component } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BPUS';

  ngOnInit() {
    init_plugins();

  }
}
