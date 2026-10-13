import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  signup(user: any): boolean {
    localStorage.setItem(user.email, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = JSON.parse(localStorage.getItem(email) || '{}');
    if (user && user.password === password) {
      localStorage.setItem('token', 'true'); // ✅ store a consistent token
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token'); // ✅ remove the token instead of 'admin'
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
