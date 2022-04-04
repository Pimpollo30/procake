import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  usuario = new Usuario();
  enviado = false;

  constructor(private usuarioService:UsuarioService, public authService:AuthService) {
  }

  ngOnInit(): void {

  }

  agregarDomicilio() {
    const user = this.authService.getUserData();
    this.usuario.id_user = user.uid;
    this.usuario.tipo_usuario = 'usuario';
    this.usuarioService.agregarDomicilio(this.usuario);
    this.usuario = new Usuario();
    this.enviado = true;
  }


}
