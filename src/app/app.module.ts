import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { CommonModule } from '@angular/common';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CambioClaveComponent } from './login/cambio-clave/cambio-clave.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//httpInterceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptors/httpInterceptor';

// Rutas
import { APP_ROUTES } from './app.routes';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CambioClaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule
    
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
