import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { LoggedInLanding } from './logged-in-landing/logged-in-landing';
import { authGuard } from '../auth-guard';
import { RedirectComponent } from '../redirect/redirect';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { OrderHistory } from './order-history/order-history';

const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'landing-page', component: LandingPage },
  { path: 'logged-in-landing', component: LoggedInLanding, canActivate: [authGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard]},
  { path: 'checkout', component: Checkout, canActivate: [authGuard]},
  { path: 'order-history', component: OrderHistory, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
