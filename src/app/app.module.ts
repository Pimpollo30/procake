import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ValidarEmailComponent } from './pages/validar-email/validar-email.component'; 
import { AuthService } from './services/auth.service';
import { DatosUsuarioComponent } from './pages/datos-usuario/datos-usuario.component';
import { UsuarioService } from './services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ConfirmarPedidoComponent } from './pages/confirmar-pedido/confirmar-pedido.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductosComponent,
    LoginComponent,
    RegistroComponent,
    ForgotPasswordComponent,
    ValidarEmailComponent,
    DatosUsuarioComponent,
    CarritoComponent,
    ConfirmarPedidoComponent,
    ConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
