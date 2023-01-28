import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const token = this.tokenService.getToken();

    // if (!token) {
    //   this.router.navigate(['/home'])

    //   return false
    // }

    // Para vigilar el estado del usuario
    return this.authService.user$.pipe(
      // Map se usa para transformar la respuesta
      map(user => {
        if (!user) {
          console.error("No autorizado")
          this.router.navigate(['/home']);
          return false;
        } else return true;
      })
    );
  }

}
