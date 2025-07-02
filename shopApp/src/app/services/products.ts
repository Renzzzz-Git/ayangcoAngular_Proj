import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  get(params: any): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:5000/api/products/all_products',
      { params: params }
    );
  }
}
