import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { LoggedInLanding } from './logged-in-landing/logged-in-landing';
import { authGuard } from '../auth-guard';
import { RedirectComponent } from '../redirect/redirect';

const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'landing-page', component: LandingPage },
  { path: 'logged-in-landing', component: LoggedInLanding, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
