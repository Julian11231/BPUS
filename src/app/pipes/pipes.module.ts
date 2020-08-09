import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';

// Lo importamos donde se van a a utilizar (PagesModule y SharedModule)

@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [],
  exports:[
    ImagenPipe
  ]
})
export class PipesModule { }
