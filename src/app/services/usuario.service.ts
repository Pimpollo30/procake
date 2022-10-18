import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore:AngularFirestore, public authService:AuthService, public router: Router) { }

    agregarDomicilio(usuario:Usuario) {
      this.firestore.collection('datos_usuario').add(Object.assign({},usuario)).then(() => {
        this.router.navigate(['confirmar-pedido']);
      });
    }

    obtenerDomicilio() {
      let user = this.authService.getUserData();
      const userState: User = {
        uid: "abc",
        email: "abc@gmail.com",
        displayName: "abc",
        photoURL: "url",
        emailVerified: true,
      }
  
      if (!user) {
        user = userState;
      }
      return this.firestore.collection('datos_usuario', ref => ref 
      .where("id_user", "==" , user.uid).limit(1) ).get();
    }

    existeDomicilio() {
      let user = this.authService.getUserData();
      const userState: User = {
        uid: "abc",
        email: "abc@gmail.com",
        displayName: "abc",
        photoURL: "url",
        emailVerified: true,
      }
  
      if (!user) {
        user = userState;
      }
      return this.firestore.collection('datos_usuario').ref.where("id_user","==",user.uid).limit(1).get();
    }
    
}
