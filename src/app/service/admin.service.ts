import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response';
import { PackagePage } from '../model/package-page';
import { Page } from '../model/page';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';

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

  getAdmins(page: number = 0): Observable<ApiResponse<Page> | HttpErrorResponse> {
    return this.http.get<ApiResponse<Page> | HttpErrorResponse>(`${this.apiUrl}admin/get-all-admin-users?page=${page}`)
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

  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>
      (`${this.apiUrl}admin/register-new-user`, user)
  }

  public viewUserProfileDetails(userId: string): Observable<User | HttpErrorResponse> {

    return this.http.get<User | HttpErrorResponse>(`${this.apiUrl}admin/view-user/${userId}`);
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.apiUrl}admin/delete-user/${username}`);
  }

  public sendEmail(recipient: string, subject: string, message: string) {

    return this.http.post<CustomHttpResponse>(`${this.apiUrl}admin/send-email`, { recipient: recipient, subject: subject, message: message });
  }

  public sendBroadcastEmail(subject: string, message: string) {

    return this.http.post<CustomHttpResponse>(`${this.apiUrl}admin/send-broadcast-email?subject=${subject}&message=${message}`, {});
  }

  public deletePackage(trackingNumber: string) {

    return this.http.delete(`${this.apiUrl}admin/delete-package/${trackingNumber}`)
  }

  public uploadInvoice(trackingNumber: string, formData: FormData) {

    return this.http.put(`${this.apiUrl}admin/file-upload/${trackingNumber}`, formData);
  }

}
