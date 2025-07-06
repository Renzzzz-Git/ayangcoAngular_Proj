import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { response } from 'express';
import { CartService } from '../../services/carts';
import { CheckoutService } from '../../services/checkout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class Cart {
  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ){}

  cartItems: any[] = [];
  totalPrice: number = 0;
  masterCheckbox: boolean = false;
  selectedItems: any[] = [];


  //Getting Current user's username
  username = JSON.parse(localStorage.getItem('user') || '{}').username;

  check(){
    console.log('CHECKING CHECKBOX')
  }

  ngOnInit(){
    this.getCart_Items(this.username)
  }

  getCart_Items(username: string) {
    this.cartService.get(username).subscribe({
      next: (response: any) => {
        this.cartItems = Array.isArray(response.items)
          ? response.items
              .map((item: any) => ({
                ...item,
                quantity: 1,
                checkState: false
              }))
              .reverse() 
          : [];

        console.log("Cart Items:", this.cartItems);
      },
      error: (err) => {
        console.error("Error retrieving cart:", err);
      }
    });
  }


  PriceCalc() {
    const rawTotal = this.cartItems
      .filter(item => item.checkState)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);

    this.totalPrice = parseFloat(rawTotal.toFixed(2));
  }

  onQuantityChange(item: any) {
    if (item.checkState) {
      const index = this.selectedItems.findIndex(i => i._id === item._id);
      if (index !== -1) {
        this.selectedItems[index].quantity = item.quantity;
        this.selectedItems[index].subtotal = parseFloat((item.price * item.quantity).toFixed(2));
      }
    }

    this.PriceCalc();
  }



  toggleAllCheckboxes(checked: boolean) {
    this.masterCheckbox = checked;
    this.cartItems.forEach(item => {
      item.checkState = checked;
      this.toggleSelection(item); // Sync selectedItems array
    });

    this.PriceCalc(); // Recalculate total after selection
  }





  toggleSelection(item: any) {
    console.log('Checkbox toggled:', item);
    
    if (item.checkState) {
      // Add item if it's not already selected
      if (!this.selectedItems.find(i => i._id === item._id)) {
        this.selectedItems.push({
          ...item,
          subtotal: parseFloat((item.price * item.quantity).toFixed(2))
        });
      }
    } else {
      // Remove item if unchecked
      this.selectedItems = this.selectedItems.filter(i => i._id !== item._id);
    }

    console.log(this.selectedItems);
    this.PriceCalc(); // recalculate total
  }






  removeItem(item: any) {
    console.log("Attempting to remove:", item.productId);
    this.cartService.remove(item, this.username).subscribe({
      next: (response: any) => {
        console.log(item)
      },
      error: (err) => {
        console.error("Error:", err);
        alert("Failed to remove item from cart.");
      }
    });
  }


  goToCheckout() {
    if (!this.selectedItems.length) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }

    this.checkoutService.setItems(this.selectedItems);
    this.router.navigate(['/checkout']);
  }


  

  
  logout(): void {  
    this.authService.logout();
  }
}
