import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreAlerts } from '../model/pre-alerts';
import { environment } from 'src/environments/environment';
import { ApplicationInfo } from '../model/application-info';

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

  upload(formData: FormData,): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}invoice-upload`, formData);
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




}
