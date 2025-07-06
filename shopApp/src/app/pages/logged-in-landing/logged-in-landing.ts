import { Component } from '@angular/core';
import { ProductService } from '../../services/products';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
import { response } from 'express';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/carts';
import { Router } from '@angular/router';

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
  selectedProduct: any = {};
  username: string = '';



  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router){}


  ngOnInit(){
    this.getProducts()
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || ''
  }

  checkUser(){
    console.log(localStorage.getItem('user'))
  }

  getProducts() {
  this.productService.get({}).subscribe({
    next: (response: any[]) => {
      this.products = response;
      console.log(this.products)
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.checkUser()
      this.updatePagedProducts();
    }
  });}

  getOne_prod(productId: string) {
  this.productService.get_one(productId).subscribe({
    next: (response: any) => {
      this.selectedProduct = response;  // Or handle however you need
      console.log("Fetched product:", this.selectedProduct);
    },
    error: (err) => {
      console.error("Error fetching product:", err);
    }
  });
}

  addToCart(item: any) {
    this.cartService.update(item, this.username).subscribe({
      next: (response: any) => {
        alert("Item added to cart successfully!");
      },
      error: (err) => {
        console.error("Error:", err);
        alert("Item already in cart.");
      }
    });
  }

  buyNow(item: any) {
    this.cartService.update(item, this.username).subscribe({
      next: (response: any) => {
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error("Error:", err);
        alert("Item already in cart.");
      }
    });
  }



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
