
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private authService:AuthService ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap( (isAuthenticated:boolean) => {
        if( !isAuthenticated ) this.router.navigate(['/','login'])
      } ),
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }

}
