import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CambioClaveComponent } from './login/cambio-clave/cambio-clave.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginGuardGuard } from './services/service.index';
import { VerificaTokenGuard } from './services/service.index';

// Rutas principales de la aplicación
const appRoutes: Routes = [

    {path: 'login', component: LoginComponent, data: {titulo: 'login'}},
    {path: 'cambio-contraseña', component: CambioClaveComponent, data: {titulo: 'Cambio de contraseña'}, canActivate: [VerificaTokenGuard, LoginGuardGuard]},
    {path: '', component: PagesComponent, canActivate: [VerificaTokenGuard, LoginGuardGuard]},
    { path: '**' , component: NopagefoundComponent}

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash:false } );