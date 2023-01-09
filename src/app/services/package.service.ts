import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreAlerts } from '../model/pre-alerts';
import { environment } from 'src/environments/environment';
import { ApplicationInfo } from '../model/application-info';
import { ApiResponse } from '../model/api-response';
import { PackagePage } from '../model/package-page';

@Injectable({
  providedIn: 'root'
})
export class PackageService {


  private apiUrl = environment.backEndApi;
  constructor(private http: HttpClient) { }


  public addNewPreAlert(preAlert: PreAlerts, fromData: FormData): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.post<PreAlerts | HttpErrorResponse>
      (`${this.apiUrl}add-new-package?trackingNumber=${preAlert.trackingNumber}&courier=${preAlert.courier}&description=${preAlert.description}&weight=${preAlert.weight}&cost=${preAlert.cost}&userId=${preAlert.userId}`, fromData);
  }

  public adminAddNewPreAlert(preAlert: PreAlerts, fromData: FormData): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.post<PreAlerts | HttpErrorResponse>
      (`${this.apiUrl}admin/create-new-pre-alert/?trackingNumber=${preAlert.trackingNumber}&courier=${preAlert.courier}&description=${preAlert.description}&status=${preAlert.status}&weight=${preAlert.weight}&cost=${preAlert.cost}&userId=${preAlert.userId}`, fromData);
  }

  public updatePreAlert(preAlert: PreAlerts, trackingNum: string): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.put<PreAlerts | HttpErrorResponse>(`${this.apiUrl}update-package/${trackingNum}`, preAlert)
  }

  public adminUpdatePreAlert(preAlert: PreAlerts, trackingNum: string): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.put<PreAlerts | HttpErrorResponse>(`${this.apiUrl}admin/update-package/${trackingNum}`,  preAlert )
  }

  upload(formData: FormData,): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}invoice-upload`, formData);
  }

  public vievPreAlert(trackingNumber: string): Observable<PreAlerts | HttpErrorResponse> {
    return this.http.get<PreAlerts | HttpErrorResponse>(`${this.apiUrl}view-package/${trackingNumber}`)
  }

  public adminViewPreAlert(trackingNumber: string): Observable<PreAlerts | HttpErrorResponse> {
    return this.http.get<PreAlerts | HttpErrorResponse>(`${this.apiUrl}admin/view-package/${trackingNumber}`)
  }


  public getUserPreAlerts(userId: string): Observable<PreAlerts[] | HttpErrorResponse> {
    return this.http.get<PreAlerts[] | HttpErrorResponse>(`${this.apiUrl}get-all-packages/${userId}`);

  }

  public getFinalCount(userId: string): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.get<PreAlerts | HttpErrorResponse>(`${this.apiUrl}total-packages/${userId}`)
  }

  public getApplicationData(): Observable<ApplicationInfo | HttpErrorResponse> {
    return this.http.get<ApplicationInfo | HttpErrorResponse>(`${this.apiUrl}admin/get-application-data`)

  }

  public getPackageByTrackingNumber(trackingNumber: string): Observable<PreAlerts | HttpErrorResponse> {
    return this.http.get<PreAlerts | HttpErrorResponse>(`${this.apiUrl}get-user-package-by-tracking-number/${trackingNumber}`)
  }


  public getAllPackagesNotShipped(userId: string, page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}get-all-user-packages-not-shipped/${userId}?page=${page}`)
  }

  public getAllPackagesShipped(userId: string, page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}get-all-user-packages-shipped/${userId}?page=${page}`)
  }

  public getAllPackagesReady(userId: string, page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}get-all-user-packages-ready/${userId}?page=${page}`)
  }

  public getAllPackagesDelivered(userId: string, page: number = 0): Observable<ApiResponse<PackagePage> | HttpErrorResponse> {
    return this.http.get<ApiResponse<PackagePage> | HttpErrorResponse>(`${this.apiUrl}get-all-user-packages-delivered/${userId}?page=${page}`)
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiUrl}invoice-download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  adminDownload(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiUrl}admin/invoice-download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }




}
