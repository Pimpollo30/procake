import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { CarritoComponent } from '../carrito/carrito.component';
import { Carrito } from 'src/app/models/carrito';
import { AuthService } from 'src/app/services/auth.service';
import { Categoria } from 'src/app/models/categoria';
import { Tamano } from 'src/app/models/tamano';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  carrito = new Carrito();
  categorias:Categoria [] = [];
  tamanos:Tamano[] = [];

  constructor(public productoService:ProductoService, private authService:AuthService) {
    this.tamanos = [
      {
        id:0,
        nombre:'Chico'
      },
      {
        id:1,
        nombre:'Grande'
      },
    ];

  }

  ngOnInit(): void {
    const producto = JSON.parse(localStorage.getItem('producto') as any);
    this.productoService.producto = producto as Producto;

    this.productoService.getCategorias().subscribe(data => {
      this.categorias = data.map(e => {
        return {
          ...e.payload.doc.data() as Categoria,
          id:e.payload.doc.id
        }
      });
      console.log(this.categorias);
    })
  }


  agregarCarrito(id:string, carrito:Carrito) {
    // console.log("Mandando carrito: "+id)
    // console.log(carrito);
    if (this.authService.isLoggedIn == true) {
    const user = this.authService.getUserData();
    this.carrito.id_usuario = user.uid;
    this.carrito.id_producto = id;
    this.productoService.agregarCarrito(carrito);
    }else {
      this.productoService.mandarLogin();
    }
  }

  getTipo(id:string) {
    var categoria = this.categorias.find((element) => {
      return element.id == id;
    });
    if (categoria != null) {
      return categoria.nombre;
    }
    return '-';
  }


}
