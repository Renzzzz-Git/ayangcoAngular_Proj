import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Orders {

  constructor(private http: HttpClient) {}

  get(params: any): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:5000/api/orders/all_orders/${params}`,
      { params: params }
    );
  }

  delete(orderId: any): Observable<any> {
    return this.http.delete(
      `http://127.0.0.1:5000/api/orders/delete_order/${orderId}`
    );
  }

}
