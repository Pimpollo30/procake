import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Tamano } from 'src/app/models/tamano';
import { Categoria } from 'src/app/models/categoria';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:Producto [] = [];
  producto = new Producto();
  tamanos:Tamano[] = [];

  categoria = new Categoria();
  categorias:Categoria[] = [];

  constructor(private ProductoService:ProductoService) { 
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

    this.ProductoService.getProductos().subscribe(data => {
      this.productos =data.map(e => { 
        return{
          ...e.payload.doc.data() as Producto,
          id : e.payload.doc.id,
        };
        
      })
    })

    this.ProductoService.getCategorias().subscribe(data => {
      this.categorias = data.map(e => {
        return {
          ...e.payload.doc.data() as Categoria,
          id:e.payload.doc.id
        }
      });
      console.log(this.categorias);
    })


  }

  agregarProducto(){
    this.ProductoService.createProducto(this.producto);
    this.producto =new Producto();
  }

  selectProducto(producto:Producto){
    this.producto = producto;
  }

  updateProducto(){
    this.ProductoService.updateProducto(this.producto);
    this.producto = new Producto;
  }

  deleteProducto(id:string){
    this.ProductoService.deleteProducto(id);
    this.producto =new Producto();
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