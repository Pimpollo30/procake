import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore:AngularFirestore, public authService:AuthService, public router: Router) { }

  getProductosCarrito() {
    // return this.firestore.collection('carrito').snapshotChanges();
    const user = this.authService.getUserData();
    return this.firestore.collection('carrito', ref => ref 
    .where("id_usuario", "==" , user.uid) ).snapshotChanges();
  }

  getProducto(id:string) {
    // console.log("GET PRODUCTO: "+id);
    return this.firestore.collection("productos").doc(id).get()
  }

  removerProducto(id:string) {
    this.firestore.doc('/carrito/'+id).delete();
  }

  agregarPedido() {
    this.getProductosCarrito().subscribe(data => {
      // data.forEach((doc) => {
      //   return this.firestore.doc('/carrito/'+doc.payload.doc.id).delete();
      // });
    })
    this.router.navigate(['confirmacion']);
  }

  getCategorias() {
    return this.firestore.collection("categorias").snapshotChanges();
  }

  agregarCategoria(categoria:Categoria) {
    this.firestore.collection('categorias').add(Object.assign({},categoria)); 
  }

  actualizarCategoria(categoria:Categoria) {
    this.firestore.doc('categorias/'+categoria.id).update(categoria);
  }

  eliminarCategoria(id:string) {
    this.firestore.collection('categorias').doc(id).delete(); 
  }
}
