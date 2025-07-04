import { Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
