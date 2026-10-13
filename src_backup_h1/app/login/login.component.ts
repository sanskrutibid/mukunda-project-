import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  template: `
     <div class="bg-dark p-5"></div>
    <div class="container" style="margin:150px">
      <h2>Admin Login</h2>
      <input
        class="form-control"
        [(ngModel)]="password"
        placeholder="Enter Password"
        type="password"
      /><br>
      <button class="btn btn-primary mt-2" (click)="login()">Login</button>
    </div>
  `
})
export class LoginComponent {
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.password === 'admin123') {
      localStorage.setItem('admin', 'true');
      this.router.navigate(['/admin']);
    } else {
      alert('Incorrect password');
    }
  }
}
