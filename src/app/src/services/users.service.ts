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
import { UserRegister } from '../models/userRegister';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'app-id': environment.token,
    }),
  };
  httpParams: HttpParamsOptions = {} as HttpParamsOptions;
  constructor(private http: HttpClient) {}

  getUsers(currentPage: number = 1, limit: number = 10): Observable<Users> {
    let params = new HttpParams().set('page', currentPage).set('limit', limit);
    return this.http.get<Users>(environment.apiUrl, {
      params,
      headers: this.httpOptions.headers,
    });
  }

  createUser(firstName: string, lastName: string, email: string): Observable<UserRegister> {
    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    const params = {
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    return this.http.post<UserRegister>(`${environment.apiUrl}/create`, payload, {
      headers: this.httpOptions.headers,
      params: params,
    });
  }
}
