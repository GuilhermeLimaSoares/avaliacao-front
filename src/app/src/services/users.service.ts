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
import { FullUser } from '../models/fullUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentIdUser: string = '';
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

  createUser(
    firstName: string,
    lastName: string,
    email: string
  ): Observable<UserRegister> {
    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    const params = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    return this.http.post<UserRegister>(
      `${environment.apiUrl}/create`,
      payload,
      {
        headers: this.httpOptions.headers,
        params: params,
      }
    );
  }

  searchUserById(id: any) {
    let params = new HttpParams().set('id', id);
    return this.http.get<FullUser>(`${environment.apiUrl}/${id}`, {
      params,
      headers: this.httpOptions.headers,
    });
  }

  editUserById(id: any, email: string, firstName: string, lastName: string): Observable<FullUser> {
    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    const params = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    return this.http.put<FullUser>(`${environment.apiUrl}/${id}`, payload, {
      params,
      headers: this.httpOptions.headers,
    });
  }
}
