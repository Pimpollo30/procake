import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto';
import { Carrito } from 'src/app/models/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private productoService:ProductoService) { }

  carritos:any[] = [];
  productos:any[] = [];
  carritoProductos:any[] = [];

  ngOnInit(): void {
    this.productoService.getProductosCarrito().subscribe(data => {
      this.carritoProductos = [];
      this.carritos = [];
      this.productos = [];
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
  }

  removerProducto(id:string) {
    this.productoService.removerProducto(id);
  }

  getTotal() {
    var total = 0;
    this.carritoProductos.forEach((carrito) => {
      total+=carrito.precio*carrito.cantidad;
    });
    return total;
  }
}
