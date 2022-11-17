import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";


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
      return false;
    }
    return false;
  }

  public logout(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }



    // public createUserData(loggedUsername: string, user?: User, profileImageUrl?: File): FormData {
  //   const formData = new FormData();
  //   formData.append('currentUser', this.loggedInUsername);
  //   formData.append('firstName', user?.firstName || '');
  //   formData.append('lastName', user?.lastName || '');
  //   formData.append('username', user?.username || '');
  //   formData.append('email', user?.email || '');
  //   formData.append('role', user?.role || '');
  //   formData.append('profileImageUrl', user?.profileImageUrl || '');
  //   formData.append('isActive', JSON.stringify(user?.active || ''));
  //   formData.append('isNonLocked', JSON.stringify(user?.notLocked || ''));
  //   return formData;
  // }
}
