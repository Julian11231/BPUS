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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RequisitosComponent,

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
