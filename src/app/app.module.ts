import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas
import { APP_ROUTES } from './app.routes';


// Servicios
import { CargaImagenesService } from './services/carga-imagenes.service';
import { environment } from 'src/environments/environment';


// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaFotosComponent } from './components/carga-fotos/carga-fotos.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaFotosComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    CargaImagenesService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
