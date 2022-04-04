import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DatosGuard } from './datos.guard';
import { LoginGuard } from './login.guard';
import { AgregarCategoriasComponent } from './pages/agregar-categorias/agregar-categorias.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { ConfirmarPedidoComponent } from './pages/confirmar-pedido/confirmar-pedido.component';
import { DatosUsuarioComponent } from './pages/datos-usuario/datos-usuario.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ValidarEmailComponent } from './pages/validar-email/validar-email.component';
import { VerProductoComponent } from './pages/ver-producto/ver-producto.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'home', component: HomeComponent, canActivate:[DatosGuard]},
  { path: 'productos', component: ProductosComponent, canActivate:[DatosGuard]},
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  { path: 'registrarse', component: RegistroComponent, canActivate:[LoginGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate:[LoginGuard]},
  { path: 'validar-email', component: ValidarEmailComponent, canActivate:[LoginGuard]},
  { path: 'datos-usuario', component: DatosUsuarioComponent, canActivate:[AuthGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate:[DatosGuard, AuthGuard]},
  { path: 'confirmar-pedido', component: ConfirmarPedidoComponent, canActivate:[DatosGuard, AuthGuard]},
  { path: 'confirmacion', component: ConfirmacionComponent, canActivate:[DatosGuard, AuthGuard]},
  { path: 'ver-producto', component: VerProductoComponent, canActivate:[DatosGuard]},
  { path: 'agregarCategorias', component: AgregarCategoriasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
