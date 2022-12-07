import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();
  private token = this.authenticationSerivce.getToken();
  constructor(private authenticationSerivce: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationSerivce.isUserLoggedIn() && !this.jwtHelper.isTokenExpired(this.token)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}
