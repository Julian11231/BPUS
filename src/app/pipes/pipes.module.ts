import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DocumentoPipe } from './documento.pipe';
import { DocumentoConvenioPipe } from './documento-convenio.pipe';

// Lo importamos donde se van a a utilizar (PagesModule y SharedModule)

@NgModule({
  declarations: [
    ImagenPipe,
    DocumentoPipe,
    DocumentoConvenioPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    DocumentoPipe,
    DocumentoConvenioPipe
  ]
})
export class PipesModule { }
