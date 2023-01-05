import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response';
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


}
