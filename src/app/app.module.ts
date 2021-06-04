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
import { RequisitosComponent } from './login/requisitos/requisitos.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Rutas
import { APP_ROUTES } from './app.routes';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CambioClaveComponent } from './login/cambio-clave/cambio-clave.component';
//import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RequisitosComponent,
    CambioClaveComponent,

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
