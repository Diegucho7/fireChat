import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chats: Observable<any[]>;

  constructor(public firestore: AngularFirestore, public cs: ChatService) {
    this.chats = firestore.collection('chats').valueChanges();
   
  }

}
