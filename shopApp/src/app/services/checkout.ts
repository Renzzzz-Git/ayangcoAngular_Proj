import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  private selectedItems: any[] = [];

  constructor(private http: HttpClient) { }

  setItems(items: any[]) {
    this.selectedItems = items;
  }

  getItems(): any[] {
    return this.selectedItems;
  }

  save(data: any, username: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:5000/api/orders/add_order/${username}`, data, { headers: { 'Content-Type': 'application/json' } });
  }
}
