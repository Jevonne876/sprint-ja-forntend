import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

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
    if (this.authenticationSerivce.isAdminLoggedIn()) {
      return true;
    }
    this.router.navigate(['/admin-login']);
    localStorage.clear();
    Notify.failure("You need to login as a admin to access this route")
    return false;
  }

}
