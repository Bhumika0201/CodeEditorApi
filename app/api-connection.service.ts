import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { data } from './data';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     })
};

const data2 = {
  script: 'console.log(7+5)',
  language: 'nodejs',
  versionIndex:'1'
}

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  private baseUrl = 'https://peaceful-scrubland-50472.herokuapp.com/api/v1/dataCreate/';
  constructor(private http: HttpClient) { }
  /** POST: add a new hero to the database */
SendData (data): Observable<any> {
  return this.http.post (this.baseUrl, data, httpOptions)

}

}
