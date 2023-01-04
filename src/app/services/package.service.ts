import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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


  public addNewPreAlert(preAlert: PreAlerts): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.post<PreAlerts | HttpErrorResponse>(`${this.apiUrl}add-new-package`, preAlert);
  }


  public getUserPreAlerts(userId: string): Observable<PreAlerts[] | HttpErrorResponse> {
    return this.http.get<PreAlerts[] | HttpErrorResponse>(`${this.apiUrl}get-all-packages/${userId}`);

  }

  public getFinalCount(userId: string): Observable<PreAlerts | HttpErrorResponse> {

    return this.http.get<PreAlerts | HttpErrorResponse>(`${this.apiUrl}total-package/${userId}`)
  }

  public getApplicationData(): Observable<ApplicationInfo | HttpErrorResponse> {

    return this.http.get<ApplicationInfo | HttpErrorResponse>(`${this.apiUrl}admin/get-application-data`)

  }




}
