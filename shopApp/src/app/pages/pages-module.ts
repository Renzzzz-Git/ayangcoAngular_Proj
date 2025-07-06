import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing-module';
import { LandingPage } from './landing-page/landing-page';
import { SignUp } from './sign-up/sign-up';
import { Login } from './login/login';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { OrderHistory } from './order-history/order-history';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoggedInLanding } from './logged-in-landing/logged-in-landing';
import { RedirectComponent } from '../redirect/redirect';


@NgModule({
  declarations: [
    LandingPage,
    SignUp,
    Login,
    Cart,
    Checkout,
    OrderHistory,
    LoggedInLanding
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    RouterModule,
    RedirectComponent
  ]
})
export class PagesModule { }
