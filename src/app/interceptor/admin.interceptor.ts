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
export class AdminInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.apiUrl}user-login`) || httpRequest.url.includes(`${this.authenticationService.apiUrl}register-new-user`) || httpRequest.url.includes(`${this.userService.apiUrl}reset-password/${this.userService.userEmail}`)) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadAdminToken();
    const token = this.authenticationService.getAdminToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return httpHandler.handle(request);

  }
}
