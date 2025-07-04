import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Only run localStorage check in browser
  if (isPlatformBrowser(platformId) && auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/landing-page']); 
  return false;
};
