import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ValidarEmailComponent } from './pages/validar-email/validar-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registrarse', component: RegistroComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'validar-email', component: ValidarEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
