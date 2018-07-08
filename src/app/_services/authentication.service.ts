import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { API_URL } from './API_URL';

@Injectable({providedIn: 'root'})

export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/register`, user)
  }
}
