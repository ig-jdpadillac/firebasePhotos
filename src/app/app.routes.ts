import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaFotosComponent } from './components/carga-fotos/carga-fotos.component';




const RUTAS: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'cargar', component:  CargaFotosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];


export const APP_ROUTES = RouterModule.forRoot( RUTAS );
