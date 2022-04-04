import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/carrito';
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
  carritoProductos:any[] = [];

  usuario = new Usuario();

  constructor(private productoService:ProductoService, private usuarioService:UsuarioService) { }

  
  ngOnInit(): void {
    this.productoService.getProductosCarrito().subscribe(data => {
      this.carritoProductos = [];
      this.carritos = data.map(e => {
        return {
          ...e.payload.doc.data() as Carrito,
          id:e.payload.doc.id
        };
    });

    data.map(e => {
      const id = (e.payload.doc.data() as any).id_producto;
      // console.log("ID CARRITO: "+id);
      this.productoService.getProducto(id).subscribe(f => {
          // console.log("PUSH: "+f.id);
          this.carritos.forEach((carrito) => {
            if (f.id == carrito.id_producto) {
              this.carritoProductos.push({id:carrito.id,cantidad: carrito.cantidad, fec_solicitud: carrito.fec_solicitud, id_producto:f.id,nombre: (f.data() as any).nombre,descripcion: (f.data() as any).descripcion, tamano: (f.data() as any).tamano, tipo: (f.data() as any).tipo, url_img: (f.data() as any).url_img, precio: (f.data() as any).precio});
            }
          });
        });
      });
    });

    this.obtenerDomicilio();
  }

  getTotal() {
    var total = 0;
    this.carritoProductos.forEach((carrito) => {
      total+=carrito.precio*carrito.cantidad;
    });
    return total;
  }

  obtenerDomicilio() {
    this.usuarioService.obtenerDomicilio().subscribe(data => {
      if (data.empty == false) {
        this.usuario = data.docs[0].data() as Usuario;
      }
    });
  }

  agregarPedido() {
    console.log("hola");
    this.productoService.agregarPedido();
  }
}
