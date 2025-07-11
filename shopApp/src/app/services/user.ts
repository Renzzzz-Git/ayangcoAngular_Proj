import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(data: any): Observable<any> {
  return this.http.post<any>('http://127.0.0.1:5000/api/users/add_user', data, { headers: { 'Content-Type': 'application/json' } });
}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/users/login', credentials, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  get_one(params: any): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:5000/api/users/get/${params}`,
      { params: params }
    );
  }

  

}
