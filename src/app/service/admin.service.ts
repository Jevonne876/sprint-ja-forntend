import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response';
import { PackagePage } from '../model/package-page';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.backEndApi;

  constructor(private http: HttpClient) { }

  //make call to backend api to get page of users

  users$ = (): Observable<ApiResponse<Page> | HttpErrorResponse> => this.http.get<ApiResponse<Page> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-users`);


  public getusers(page: number = 0): Observable<ApiResponse<Page> | HttpErrorResponse> {
    return this.http.get<ApiResponse<Page> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-users?page=${page}`)
  }

  public getAllPackages(page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-user-packages?page=${page}`)
  }

  public getAllPackagesNotShipped(page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-user-packages-not-shipped?page=${page}`)
  }

  public getAllPackagesShipped(page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-user-packages-shipped?page=${page}`)
  }

  public getAllPackagesReady(page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-user-packages-ready?page=${page}`)
  }

  public getAllPackagesDelivered(page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-user-packages-delivered?page=${page}`)
  }



}
