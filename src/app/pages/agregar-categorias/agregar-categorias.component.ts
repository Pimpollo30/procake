import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-categorias',
  templateUrl: './agregar-categorias.component.html',
  styleUrls: ['./agregar-categorias.component.css']
})
export class AgregarCategoriasComponent implements OnInit {

  categoria = new Categoria();

  constructor(private productoService:ProductoService) { }

  categorias:Categoria[] = [];
  ngOnInit(): void {
    this.productoService.getCategorias().subscribe(data => {
      this.categorias = data.map(e => {
        return {
          ...e.payload.doc.data() as Categoria,
          id:e.payload.doc.id
        }
      });
    })
  }

  selectCategoria(categoria:Categoria) {
    this.categoria = categoria;
  }

  agregarCategoria() {
    this.productoService.agregarCategoria(this.categoria);
    this.categoria = new Categoria();
  }

  eliminarCategoria(id:string) {
    this.productoService.eliminarCategoria(id);
    this.categoria = new Categoria();
  }

  actualizarCategoria() {
    this.productoService.actualizarCategoria(this.categoria);
    this.categoria = new Categoria();
  }
}
