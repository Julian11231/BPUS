import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CambioClaveComponent } from './login/cambio-clave/cambio-clave.component';
import { PagesComponent } from './pages/pages.component';
import { RequisitosComponent } from './login/requisitos/requisitos.component';



// Rutas principales de la aplicación
const appRoutes: Routes = [

    {path: 'login', component: LoginComponent, data: {titulo: 'login'}},
    {path: 'requisitos', component: RequisitosComponent, data: {titulo: 'requisitos'} },
    {path: 'cambio-contraseña', component: CambioClaveComponent, data: {titulo: 'Cambio de contraseña'} },
    {path: '', component: PagesComponent}
    
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash:false } );