import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Carrito } from '../models/carrito';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto = new Producto();

  constructor(private firestore:AngularFirestore, public authService:AuthService, public router: Router) { }

  createProducto(producto:Producto){
    return this.firestore.collection('productos').add(Object.assign({},producto));
  }

  getProductos(){
    return this.firestore.collection('productos').snapshotChanges();
  }

  updateProducto(producto:Producto){
    return this.firestore.doc('productos/'+producto.id).update(producto);
  }

  deleteProducto(productoId:string){
    this.firestore.doc('productos/'+productoId).delete();
  }

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
    const user = this.authService.getUserData();
    this.firestore.collection('carrito', ref => ref 
    .where("id_usuario", "==" , user.uid)).get().subscribe(data => {
      data.forEach(doc => {
        doc.ref.delete();
      })
    });
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

  verProducto(producto:Producto) {
    this.producto = producto;
    localStorage.setItem('producto',JSON.stringify(producto));
    this.router.navigate(['ver-producto']);
  }

  agregarCarrito(carrito:Carrito) {
    console.log("agregando carro: "+carrito.id);
    this.firestore.collection('carrito').add(Object.assign({},carrito)); 
    this.router.navigate(['carrito']);
  }
}
