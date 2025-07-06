import { Component } from '@angular/core';
import { ProductService } from '../../services/products';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
import { response } from 'express';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/carts';
import { Router } from '@angular/router';
import { Orders } from '../../services/orders'; 

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory{
  constructor(
    private authService: AuthService,
    private orderService: Orders 
  ) {}

  orders: any[] = [];
  username = JSON.parse(localStorage.getItem('user') || '{}').username;
  items: any[] = [];

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.get(this.username).subscribe({
      next: (response: any) => {
        this.orders = response;
        this.items = this.orders.flatMap(order => order.items); // ✅ Flatten all items into a single array
        console.log('User Orders:', this.orders);
        console.log('All Ordered Items:', this.items);
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
