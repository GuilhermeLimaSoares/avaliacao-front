import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { environment } from './../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('app-id', '6452a8908edea0eafd918058');
  httpParams: HttpParamsOptions = {} as HttpParamsOptions;
  options = { params: new HttpParams(this.httpParams), headers: this.headers };
  constructor(private http: HttpClient) {}

  getUsers(currentPage: number = 1, limit: number = 10): Observable<Users> {
    let params = new HttpParams()
    .set('page', currentPage)
    .set('limit', limit);
    return this.http
      .get<Users>(environment.apiUrl, {params, headers: this.headers });
  }
}
