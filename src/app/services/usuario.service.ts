import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore:AngularFirestore, public authService:AuthService, public router: Router) { }

    agregarDomicilio(usuario:Usuario) {
      this.firestore.collection('datos_usuario').add(Object.assign({},usuario)).then(() => {
        this.router.navigate(['home']);
      });
    }

    obtenerDomicilio() {
      const user = this.authService.getUserData();
      return this.firestore.collection('datos_usuario', ref => ref 
      .where("id_user", "==" , user.uid).limit(1) ).get();
    }

    existeDomicilio() {
      const user = this.authService.getUserData();
      return this.firestore.collection('datos_usuario').ref.where("id_user","==",user.uid).limit(1).get();
    }
    
}
