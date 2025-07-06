import { Component } from '@angular/core';
import { ProductService } from '../../services/products';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
import { response } from 'express';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/carts';





@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})

export class LandingPage {
  loginUsername = '';
  loginPassword = '';

  products: any[] = [];
  pagedProducts: any[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalPages: number = 1;

  user = {}
  cart = {}
  name: string = ""
  username: string = ""
  password: string = ""
  email: string = ""
  address = {}
  street: string = ""
  suite: string = ""
  city: string = ""
  zipcode: string = ""

  clean(){
    this.name = ""
    this.username = ""
    this.password = ""
    this.email = ""
    this.address = {}
    this.street = ""
    this.suite = ""
    this.city = ""
    this.zipcode = ""
    this.user = {}
    this.cart = {}
  }

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ){

  }

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


  addUser(form: NgForm){
    
    this.user = {
      "name": form.value['name'],
        "username": form.value['username'],
        "password": form.value['password'],
        "email": form.value['email'],
        "address": {
            "street": form.value['street'],
            "suite": form.value['suite'],
            "city": form.value['city'],
            "zipcode": form.value['zipcode']
      }
    }
    this.cart = {"username": form.value['username']}
    console.log(this.user)

    if (form.valid) {
          this.userService.save(this.user).subscribe({
          next:(response:any) => {
            console.log(this.user);
            alert('Account created!');
          }
          })
          this.cartService.save_cart(this.cart).subscribe({
          next:(response:any) => {
            console.log(this.cart);
          }
          })
          this.clean();
          console.log('Form Submitted!', form.value);
    } else {
        console.log('Form is invalid.');
        this.clean();
    }

  }

login() {
  const credentials = {
    username: this.loginUsername,
    password: this.loginPassword
  };

  this.userService.login(credentials).subscribe({
    next: (response) => {
      console.log("Login response:", response);

      try {
        localStorage.setItem('user', JSON.stringify(response.user));
      } catch (e) {
        console.warn("localStorage failed:", e);
      }

      console.log("Redirecting to /logged-in-landing...");
      this.router.navigate(['/logged-in-landing']);
    },
    error: (err) => {
      console.error('Login failed', err);
      alert('Invalid username or password');
    }
  });
}



  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  promptLoginOrSignup() {
    alert("Login first or create an account if you don't have one")
  }


}


