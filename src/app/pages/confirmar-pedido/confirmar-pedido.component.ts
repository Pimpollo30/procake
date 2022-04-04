import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/carrito';
import { Producto } from 'src/app/models/producto';
import { Tamano } from 'src/app/models/tamano';
import { Usuario } from 'src/app/models/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {
  carritos:any[] = [];
  productos:any[] = [];
  tamanos:Tamano[] = [];

  usuario = new Usuario();

  constructor(private productoService:ProductoService, private usuarioService:UsuarioService) {
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

    this.obtenerDomicilio();
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
    return new Producto();
  }

  obtenerDomicilio() {
    this.usuarioService.obtenerDomicilio().subscribe(data => {
      if (data.empty == false) {
        this.usuario = data.docs[0].data() as Usuario;
      }
    });
  }

  agregarPedido() {
    this.productoService.agregarPedido();
  }
}
