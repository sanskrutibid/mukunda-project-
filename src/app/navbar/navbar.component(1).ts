import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  // navbar.component.ts
  isMenuOpen = false;

  constructor(private renderer: Renderer2) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  ngOnInit(): void {
    // Run scroll check once on initial load
    this.checkScroll();
  }

  // Listen for scrolls
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector('.navbar') as HTMLElement;

    if (header) {
      if (scrollY > 50) {
        this.renderer.addClass(header, 'header-scrolled');
      } else {
        this.renderer.removeClass(header, 'header-scrolled');
      }
    }
  }
}