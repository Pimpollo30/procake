import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto';
import { Carrito } from 'src/app/models/carrito';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritos:any[] = [];
  productos:any[] = [];
  carritoProductos:any[] = [];


  constructor(public authService:AuthService,private productoService:ProductoService) { }
  ngOnInit(): void {
    if (this.authService.isLoggedIn == true) {
    this.productoService.getProductosCarrito().subscribe(data => {
      this.carritos = data.map(e => {
        return {
          ...e.payload.doc.data() as Carrito,
          id:e.payload.doc.id
        };
    });
  });

    this.productoService.getProductos().subscribe(data => {
      this.productos = data.map(e => {
        return {
          ...e.payload.doc.data() as Producto,
          id:e.payload.doc.id
        };
    });
  }); 
}
  }

  removerProducto(id:string) {
    this.productoService.removerProducto(id);
  }

  getTotal() {
    var total = 0;
    this.carritos.forEach((carrito) => {
      total+=this.getProducto(carrito.id_producto).precio*carrito.cantidad;
    });
    return total;
  }

  
  getProducto(id:string) {
    var producto = this.productos.find((element) => {
      return element.id == id;
    });
    if (producto != null) {
      return producto;
    }
    producto = new Producto();
    producto.id=''; 
    producto.descripcion=''; 
    producto.nombre=''; 
    producto.precio=0; 
    producto.tamano=0; 
    producto.tipo=''; 
    producto.url_img='assets/images/dummy.png'; 
    return producto;
  }

  
}
