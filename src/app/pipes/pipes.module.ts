import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DocumentoPipe } from './documento.pipe';

// Lo importamos donde se van a a utilizar (PagesModule y SharedModule)

@NgModule({
  declarations: [
    ImagenPipe,
    DocumentoPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    DocumentoPipe
  ]
})
export class PipesModule { }
