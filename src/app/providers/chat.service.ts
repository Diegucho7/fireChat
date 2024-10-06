import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { app } from '../../../server';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsColection?: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {}; 

  constructor(private afs : AngularFirestore, public auth: AngularFireAuth) { this.auth.authState.subscribe(
    (user) => {
      console.log('Estado del usuario ', user);
      if( !user ) return;

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    }
  );  }

  login( proveedor: string ){
    let p;
    if( proveedor == 'google'){
      p = new firebase.auth.GoogleAuthProvider();
    }
    else {
      p = new firebase.auth.TwitterAuthProvider();
    }
    this.auth.signInWithPopup( p );
  }
 
  logout(){
    this.usuario = {};
    this.auth.signOut();  }

  cargarMensajes() {
    this.itemsColection = this.afs.collection<Mensaje>
                            ('chats', ref=> ref.orderBy('fecha', 'desc').limit(5));
                                return this.itemsColection.valueChanges()
                                .pipe(map((mensajes: Mensaje[]) => {
                                  console.log(mensajes);

                                  this.chats = [];
                                  for (let mensaje of mensajes) {
                                    this.chats.unshift(mensaje);
                                  }
                                  // this.chats = mensajes;
                                  return this.chats
     })
  )
                                
  }

  agregarMensajes( texto: string) {

    let Mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date(),
      uid: this.usuario.uid
    }

    return this.itemsColection?.add(Mensaje);

  }

}
