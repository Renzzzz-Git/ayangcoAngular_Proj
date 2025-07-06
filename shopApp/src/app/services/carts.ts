import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  save_cart(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/carts/add_cart', data, { headers: { 'Content-Type': 'application/json' } });
  }

  get(params: any): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:5000/api/carts/get/${params}`,
      { params: params }
    );
  }

  update(data: any, user: any): Observable<any> {
    return this.http.patch<any>(`http://127.0.0.1:5000/api/carts/append_item/${user}`, data, { headers: { 'Content-Type': 'application/json' } });
  }

  remove(data: any, user: any): Observable<any> {
    return this.http.patch<any>(`http://127.0.0.1:5000/api/carts/remove_item/${user}`, data, { headers: { 'Content-Type': 'application/json' } });
  }
}
