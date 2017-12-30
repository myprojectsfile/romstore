import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Container } from './container';

@Injectable()
export class RmtoApiService {

  constructor(private http: HttpClient) { }

  getReceiptContainers(receiptNumber: string): Observable<Container[]> {

    const apiUri = window.location.origin;

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<any[]>(apiUri + '/api/CCS/GetReceiptContainers/' + receiptNumber, { headers: headers });
  }

}

