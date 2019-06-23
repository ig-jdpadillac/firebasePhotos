import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener ( 'dragover', ['$event'] )
  public onDragEnter ( event: any ) {
    this.mouseSobre.emit ( true );
    this._prevenirDetener ( event );
  }


  @HostListener ( 'dragleave', ['$event'] )
  public onDragLeave ( event: any ) {
    this.mouseSobre.emit ( false );
    this._prevenirDetener ( event );
  }

  @HostListener ( 'drop', ['$event'] )
  public onDrop ( event: any ) {

    const transferencia = this._getTrasnferencia ( event );

    if ( !transferencia ) {
      return;
    }

    this._extraerArchivos ( transferencia.files );

    this._prevenirDetener ( event );
    this.mouseSobre.emit ( false );

  }

  private _getTrasnferencia ( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos ( archivosLista: FileList ) {
    // console.log ( archivosLista );

    // tslint:disable-next-line:forin
    for (  const propiedad in Object.getOwnPropertyNames ( archivosLista ) ) {
      const archivoTemporal = archivosLista [ propiedad ];

      if  ( this._archivoPuedeSerCargado ( archivoTemporal ) ) {
        const nuevoArchivo = new FileItem ( archivoTemporal );
        this.archivos.push ( nuevoArchivo );
      }
    }

    console.log ( this.archivos );
  }



  // Validaciones
  private _archivoPuedeSerCargado ( archivo: File ): boolean {
    if ( !this._archivoYaDropeado ( archivo.name )  &&  this._esImagen ( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }
// ------------------------------------

// Evitar que el navegador abra la imagen al soltarlao havcer el drop
  private _prevenirDetener ( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

// ------------------------------------------
// Validar o verificar que el archivo no haya sido dropeado antes

  private _archivoYaDropeado ( nombreArchivo: string ): boolean {

    for ( const archivo of this.archivos ) {
      if (archivo.nombreArchivo === nombreArchivo ) {
        console.log ( 'El archivo' + nombreArchivo + 'Ya está agregado'  );
        return true;
      }

    }

    return false;

  }

  // / Validacion para verificar que sean imagenes

  private _esImagen (  tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith ( 'image' );
  }






}
