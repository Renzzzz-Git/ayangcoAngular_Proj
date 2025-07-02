import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';
import { LandingPage } from './landing-page/landing-page';
import { SignUp } from './sign-up/sign-up';
import { Login } from './login/login';
import { Order } from './order/order';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { OrderHistory } from './order-history/order-history';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingPage,
    SignUp,
    Login,
    Order,
    Cart,
    Checkout,
    OrderHistory
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class PagesModule { }
