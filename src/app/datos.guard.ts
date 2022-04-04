import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DatosGuard implements CanActivate {
  constructor(
    public authService:AuthService,
    public router: Router,
    public usuarioService:UsuarioService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn == true){
      this.usuarioService.existeDomicilio().then((data) => {
        if (data.empty != false) {
          this.router.navigate(['datos-usuario'])      
        }
      });
    }
    return true;
    
  }
  
}
