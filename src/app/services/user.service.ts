import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormGroup } from '@angular/forms';
import { CustomHttpResponse } from '../model/custom-http-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*gets backend api fron environemnt file.*/
  public apiUrl = environment.backEndApi;
  public userEmail: string = ''
  private loggedInUsername: string = ''
  private token: string = '';
  private jwtHelper = new JwtHelperService();
  private adminToken: string;

  constructor(private http: HttpClient) { }

  public getUser(username: string): Observable<User | HttpErrorResponse> {
    return this.http.get<User | HttpErrorResponse>(`${this.apiUrl}find-user/${username}`);
  }

  public getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  public updateUser(loggedInUsername: string, formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.put<User | HttpErrorResponse>
      (`${this.apiUrl}update-user/${loggedInUsername}`, formData)
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') || '';
  }

  public loadAdminToken(): void {
    this.adminToken = localStorage.getItem('admin-token') || '';
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.apiUrl}reset-password/${email}`)

  }

  public isUserLoggedIn(): boolean {
    this.loadAdminToken();
    if (this.adminToken !== null && this.adminToken !== '') {
      if (this.jwtHelper.decodeToken(this.adminToken).sub !== null || '') {
        if (!this.jwtHelper.isTokenExpired(this.adminToken)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
      this.adminLogout();
      return false;
    }
    return false;
  }

  public logout(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  public adminLogout(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('admin');
    localStorage.removeItem('admin-token');
  }
}
