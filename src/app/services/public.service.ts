import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  public apiUrl = environment.backEndApi;


  constructor(private http: HttpClient) { }


  public sendPublicQuery(fullName: string, email: string, phoneNumber: string, message: string): Observable<boolean> {

    return this.http.post<boolean>(`${this.apiUrl}send-query/${fullName}/${email}/${phoneNumber}/${message}`, "")

  }


}
