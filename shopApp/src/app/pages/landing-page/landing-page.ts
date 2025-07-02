import { Component } from '@angular/core';
import { ProductService } from '../../services/products';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {
  products: {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}[] = [];


  constructor(
    private userService: ProductService
  ){

  }

  ngOnInit(){
    this.getProducts()
  }

  getProducts(){
    this.userService.get({}).subscribe({
      next:(response:any)  => {
        this.products = response
        console.log(this.products)

      }
    })
  }








}
