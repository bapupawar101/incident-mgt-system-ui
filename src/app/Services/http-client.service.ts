import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {  
  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("jwtToken")
    })
  };

  constructor(private httpClient: HttpClient) {     
  }

  get(url: string): Observable<any> {
    return this.httpClient.get(url, this.httpOtions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  create(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, JSON.stringify(data), this.httpOtions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  post(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, JSON.stringify(data), this.httpOtions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
  
  update(url: string, data: any): Observable<any> {
    return this.httpClient.put(url, JSON.stringify(data), this.httpOtions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
  
  find(url: string): Observable<any> {
    return this.httpClient.get(url).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
  
  delete(url: string): Observable<any> {
    return this.httpClient.delete(url).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
}
