import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestore} from '@angular/fire/compat/firestore';

// componentes

import { ChatComponent } from './components/chat/chat.component';
import { NgModel } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

// Servicios
import { ChatService } from './providers/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFirestore, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
