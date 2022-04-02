import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

export interface User{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  userState: any;

  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.fireAuth.authState.subscribe(user => {
      if(user){
        this.userState = user;
        localStorage.setItem('user',JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user') as any);
      }else{
        localStorage.setItem('user',null!);
        JSON.parse(localStorage.getItem('user') as any);
      }
    })
  }

   //método para login con usuario y contraseña
   login(email:string,password:string){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  //método para registrarse con usuario y contraseña
  registrar(email:string,password:string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  //método para enviar email de verificación
  sendVerificationMail(){
    return this.fireAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['validar-email']);
      })
  }

  //método para cuando el usuario olvidó su password
  forgotPassword(passwordResetEmail:string){
    return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Se envió correo para restablecer password');
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  //getter para cuando el usuario está logueado
  get isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user') as any);
    return (user != null && user.emailVerified != false) ? true : false;
  }

  //método para autenticarse con Google
  googleAuth(){
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  //método para loguearse con proveedores (Google, Facebook, etc)
  authLogin(provider:any){
    return this.fireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  setUserData(user:any){
    const userRef: AngularFirestoreDocument<any> = 
      this.firestore.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState,{merge:true})
  }

  //método para cerrar sesión
  logout(){
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    })
  }
}
