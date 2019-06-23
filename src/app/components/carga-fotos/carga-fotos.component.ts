import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga-fotos',
  templateUrl: './carga-fotos.component.html',
  styleUrls: ['./carga-fotos.component.css']
})
export class CargaFotosComponent implements OnInit {


  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor ( public _cargaImagenesService: CargaImagenesService ) { }

  ngOnInit() {
  }

  cargarImagenes (  ) {
    this._cargaImagenesService.cargarImagenesFirebase ( this.archivos );
  }

  pruebaSobreElemento ( event: any ) {
    console.log ( event );
  }

  lipiarArchivos () {
    this.archivos = [];
  }

}
