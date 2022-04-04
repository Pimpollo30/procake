import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos2',
  templateUrl: './productos2.component.html',
  styleUrls: ['./productos2.component.css']
})
export class Productos2Component implements OnInit {

  productos:Producto [] = [];

  producto = new Producto();

  constructor(private ProductoService:ProductoService) { }

  ngOnInit(): void {
    this.ProductoService.getProductos().subscribe(data => {
      this.productos =data.map(e => { 
        return{
          ...e.payload.doc.data() as Producto,
          id : e.payload.doc.id,
        };
        
      })
    })


  }

  verProducto(producto:Producto) {
    this.ProductoService.verProducto(producto);
  }


}
