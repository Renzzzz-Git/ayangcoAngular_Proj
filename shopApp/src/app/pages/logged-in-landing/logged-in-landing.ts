import { Component } from '@angular/core';
import { ProductService } from '../../services/products';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
import { response } from 'express';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-logged-in-landing',
  standalone: false,
  templateUrl: './logged-in-landing.html',
  styleUrl: './logged-in-landing.css'
})
export class LoggedInLanding {
  products: any[] = [];
  pagedProducts: any[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalPages: number = 1;


  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService){}


  ngOnInit(){
    this.getProducts()
  }

  getProducts() {
  this.productService.get({}).subscribe({
    next: (response: any[]) => {
      this.products = response;
      console.log(this.products)
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.updatePagedProducts();
    }
  });}

  updatePagedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.pagedProducts = this.products.slice(startIndex, endIndex);
}

  get totalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }

  logout(): void {
    this.authService.logout();
  }


  
}
