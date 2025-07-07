import { Component } from '@angular/core';
import { CheckoutService } from '../../services/checkout';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})


export class Checkout {

  items: any[] = [];
  totalPrice = 0;
  //Getting Current user's username
  username = JSON.parse(localStorage.getItem('user') || '{}').username;
  address: any = null;
  paymentMethod: any = ''

  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = this.checkoutService.getItems();
    console.log("Selected items at checkout:", this.items);
    this.calcPrice(this.items); // Calculate total on load
    this.getUserAddress();
  }

  calcPrice(items: any[]) {
    this.totalPrice = 0;

    this.items = items.map(item => {
      item.subtotal = parseFloat((item.price * item.quantity).toFixed(2));
      this.totalPrice += item.subtotal;
      return item;
    });

    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }


  // Subtotal function for a single item
  getSubtotal(item: any): number {
    return parseFloat((item.price * item.quantity).toFixed(2));
  }

  getUserAddress() {
    this.userService.get_one(this.username).subscribe({
      next: (response: any) => {
        if (response && response.address) {
          this.address = response.address;
          console.log('User Address:', this.address);
        } else {
          console.warn("Address not found.");
        }
      },
      error: (err) => {
        console.error("Error fetching user address:", err);
      }
    });
  }


  add_order() {
    // Check if items array is empty
    if (!this.items || this.items.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    // Check if a payment method is selected
    if (!this.paymentMethod || this.paymentMethod.trim() === '') {
      alert("Please select a payment method before placing the order.");
      return;
    }

    const order_data = {
      items: this.items,                 // includes _id, name, price, quantity, etc.
      paymentMethod: this.paymentMethod, // selected via dropdown
      totalPrice: this.totalPrice        // calculated in calcPrice()
    };

    this.checkoutService.save(order_data, this.username).subscribe({
      next: (response: any) => {
        console.log(this.username);
        alert('Order Added!');
        this.router.navigate(['/order-history']);
      },
      error: (err) => {
        console.error("Failed to add order:", err);
        alert("Failed to place order.");
      }
    });
  }








}

