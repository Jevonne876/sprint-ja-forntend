import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService, private userService:UserService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.apiUrl}login`) || httpRequest.url.includes(`${this.authenticationService.apiUrl}register`) || httpRequest.url.includes(`${this.userService.apiUrl}reset-password/${this.userService.userEmail}`)) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return httpHandler.handle(request);

  }

  }

