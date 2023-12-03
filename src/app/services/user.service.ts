import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '../model/token.';
import { BehaviorSubject } from 'rxjs';
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

  private emailSubject = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  public getUser(username: string): Observable<User | HttpErrorResponse> {
    return this.http.get<User | HttpErrorResponse>(`${this.apiUrl}find-user/${username}`);
  }

  public getUserByUserId(userId: string): Observable<User | HttpErrorResponse> {
    return this.http.get<User | HttpErrorResponse>(`${this.apiUrl}admin/view-user/${userId}`);
  }

  public updateUser(user: User): Observable<User | HttpErrorResponse> {
    return this.http.put<User | HttpErrorResponse>
      (`${this.apiUrl}update-user?userId=${user.userId}&trn=${user.trn}&newFirstName=${user.firstName}&newLastName=${user.lastName}&newEmail=${user.email}&newPhoneNumber=${user.phoneNumber}&newAddress1=${user.streetAddress}&newAddress2=${user.parish}&newPickUpBranch=${user.pickUpBranch}`, user)
  }

  public getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user') || '');
  }


  public loadToken(): void {
    this.token = localStorage.getItem('token') || '';
  }

  public loadAdminToken(): void {
    this.adminToken = localStorage.getItem('admin-token') || '';
  }

  public forgotPassword(email: string): Observable<Token | HttpErrorResponse> {
    return this.http.post<Token | HttpErrorResponse>(`${this.apiUrl}forgot-password?email=${email}`, {})
  }

  public resetPassword(email: string, password: string): Observable<Boolean> {
    return this.http.put<Boolean>(`${this.apiUrl}reset-password?email=${email}&password=${password}`, {})
  }


  public adminGetUser(userId: string): Observable<User | HttpErrorResponse> {
    return this.http.get<User | HttpErrorResponse>(`${this.apiUrl}/admin/view-user/${userId}`);
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

  data$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }
}
