import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /*gets backend api fron environemnt file.*/
  public apiUrl = environment.backEndApi;
  private token: string = '';
  private loggedInUsername: string = ''
  private jwtHelper = new JwtHelperService();
  private adminToken: string;

  constructor(private http: HttpClient) { }


  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>
      (`${this.apiUrl}register-new-user`, user)
  }

  public adminRegister(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>
      (`${this.apiUrl}admin/register-new-admin`, user)
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>
      (`${this.apiUrl}user-login`, user, { observe: 'response' });
  }

  public adminLogin(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>
      (`${this.apiUrl}admin/admin-login`, user, { observe: 'response' });
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

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public saveAdminToken(token: string): void {
    this.token = token;
    localStorage.setItem('admin-token', token);
  }

  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public addAdminUserToLocalStorage(user: User): void {
    localStorage.setItem('admin', JSON.stringify(user));
  }

  public getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  public getAdminUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('admin') || '');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') || '';
  }

  public loadAdminToken(): void {
    this.adminToken = localStorage.getItem('admin-token') || '';
  }

  public getToken(): string {
    return this.token;
  }

  public getAdminToken(): string {
    return this.adminToken;
  }

  public isAdminLoggedIn(): boolean {
    this.loadAdminToken();
    if (this.adminToken !== null && this.adminToken !== '') {
      if (this.jwtHelper.decodeToken(this.adminToken).sub !== null || '') {
        if (!this.jwtHelper.isTokenExpired(this.adminToken)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.adminToken).sub;
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

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token !== null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub !== null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
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


}
