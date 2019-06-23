import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
// import { url } from 'inspector';
import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor ( private _db: AngularFirestore ) {
    }

    cargarImagenesFirebase ( imagenes: FileItem[] ) {

      const storageRef = firebase.storage().ref();

      for ( const item of imagenes ) {
        item.estaSubiendo = true;

        if ( item.progreso >= 100 ) {
          continue;
        }

        const uploadTask: firebase.storage.UploadTask =
                storageRef.child ( `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }` )
                          .put ( item.archivo );
        uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
            ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
            ( error ) => console.error ( 'Error al subir', error ),
            (  ) => {
              console.log ('Imagen cargada correctamente');
              // item.ulr = uploadTask.snapshot.downloadURL;
              const urlPromise = uploadTask.snapshot.ref.getDownloadURL();
              urlPromise.then ( url => {
                item.ulr = url;
                item.estaSubiendo = false;
                this.guardarImagen ( {
                  nombre: item.nombreArchivo,
                  url: item.ulr
                } );

            }
          );
          }
        );
        }
    }



    private guardarImagen ( imagen: { nombre: string, url: string } ) {
      this._db.collection(`/${ this.CARPETA_IMAGENES }`)
          .add ( imagen );
    }
}
