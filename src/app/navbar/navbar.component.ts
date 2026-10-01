import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],

  template: `
    <header class="mk-header" [class.mk-header-scrolled]="isScrolled">
      <div class="mk-header-inner">

        <!-- BOTH LOGOS - ALWAYS VISIBLE -->
        <a
          class="mk-brand"
          routerLink="/"
          aria-label="Mukunda Infraventures Home"
          (click)="closeMobileMenu()"
        >
          <img
            src="assets/images/mukunda_logo_1.png"
            alt="Mukunda Group"
            class="mk-logo mk-logo-one"
          />

          <img
            src="assets/images/logo_MUKUNDA.png"
            alt="Mukunda Infraventures"
            class="mk-logo mk-logo-two"
          />
        </a>


        <!-- MOBILE MENU BUTTON -->
        <button
          type="button"
          class="mk-mobile-button"
          [class.mk-mobile-button-open]="menuOpen"
          [attr.aria-expanded]="menuOpen"
          aria-label="Open navigation menu"
          (click)="toggleMobileMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        <!-- NAVIGATION -->
        <nav class="mk-navigation" [class.mk-navigation-open]="menuOpen">

          <a class="mk-nav-link" routerLink="/" routerLinkActive="mk-active"
             [routerLinkActiveOptions]="{ exact: true }"
             (click)="closeMobileMenu()">Home</a>

          <a class="mk-nav-link" routerLink="/discover" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">Discover</a>

          <a class="mk-nav-link" routerLink="/aboutus" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">About Us</a>

          <a class="mk-nav-link" routerLink="/blog" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">Blog</a>

          <a class="mk-nav-link" routerLink="/projects" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">Projects</a>

          <a class="mk-nav-link" routerLink="/career" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">Careers</a>

          <a class="mk-nav-link" routerLink="/faq" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">FAQ</a>

          <a class="mk-nav-link" routerLink="/contacts" routerLinkActive="mk-active"
             (click)="closeMobileMenu()">Contact Us</a>

        </nav>

      </div>
    </header>
  `,

  styles: [`

    :host { display: block; }

    .mk-header,
    .mk-header *,
    .mk-header *::before,
    .mk-header *::after {
      box-sizing: border-box;
      font-family: 'Alevia', serif;
    }


    /* ---------- HEADER (old look: transparent, blur on scroll) ---------- */

    .mk-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 90px;
      z-index: 99999;
      background: transparent;
      transition: background 0.3s ease, backdrop-filter 0.3s ease;
    }

    .mk-header.mk-header-scrolled {
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }

    .mk-header-inner {
      width: 100%;
      max-width: 1800px;
      height: 90px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }


    /* ---------- LOGOS ---------- */

    .mk-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 0 0 auto;
      height: 90px;
      text-decoration: none;
      cursor: pointer;
    }

    .mk-header .mk-logo {
      display: block !important;
      width: auto !important;
      height: auto !important;
      object-fit: contain;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
    }

    .mk-header .mk-logo-one { max-width: 125px !important; max-height: 78px !important; }
    .mk-header .mk-logo-two { max-width: 310px !important; max-height: 72px !important; }


    /* ---------- MENU (old look: white, 25px, red active) ---------- */

    .mk-navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
      min-width: 0;
      height: 90px;
      gap: 6px;
    }

    .mk-header .mk-nav-link {
      position: relative;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: auto !important;
      height: 90px;
      padding: 0 12px !important;
      color: #ffffff !important;
      font-size: 28px !important;
      font-weight: 500 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      word-break: keep-all !important;
      text-decoration: none !important;
      text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
      transition: color 0.25s ease;
    }

    /* underline animation like old css */
    .mk-header .mk-nav-link::after {
      content: '';
      position: absolute;
      left: 12px;
      bottom: 27px;
      width: 0;
      height: 2px;
      background: #e60000;
      transition: width 0.3s;
    }

    .mk-header .mk-nav-link:hover,
    .mk-header .mk-nav-link:active {
      color: red !important;
    }

    .mk-header .mk-nav-link:hover::after {
      width: calc(100% - 24px);
    }

    .mk-header .mk-nav-link.mk-active {
      color: #e60000 !important;
      font-weight: 600 !important;
    }

    .mk-header .mk-nav-link.mk-active::after {
      width: calc(100% - 24px);
    }


    /* ---------- MOBILE BUTTON ---------- */

    .mk-mobile-button {
      display: none;
      width: 44px;
      height: 44px;
      flex: 0 0 44px;
      padding: 7px;
      margin-right: 6px;
      border: none;
      background: transparent;
      cursor: pointer;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
    }

    .mk-mobile-button span {
      display: block;
      width: 30px;
      height: 3px;
      background: #ffffff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      transition: transform 0.25s ease, opacity 0.25s ease, background 0.25s ease;
    }

    .mk-mobile-button:hover span { background: #e60000; }

    .mk-mobile-button-open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
    .mk-mobile-button-open span:nth-child(2) { opacity: 0; }
    .mk-mobile-button-open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }


    /* ---------- RESPONSIVE ---------- */

    @media (max-width: 1500px) {
      .mk-header-inner { padding: 0 20px; }
      .mk-header .mk-logo-one { max-width: 105px !important; max-height: 70px !important; }
      .mk-header .mk-logo-two { max-width: 265px !important; max-height: 62px !important; }
      .mk-header .mk-nav-link { font-size: 24px !important; padding: 0 10px !important; }
      .mk-header .mk-nav-link::after { left: 10px; }
      .mk-header .mk-nav-link:hover::after,
      .mk-header .mk-nav-link.mk-active::after { width: calc(100% - 20px); }
    }

    @media (max-width: 1250px) {
      .mk-header-inner { padding: 0 14px; gap: 10px; }
      .mk-brand { gap: 8px; }
      .mk-header .mk-logo-one { max-width: 85px !important; max-height: 60px !important; }
      .mk-header .mk-logo-two { max-width: 195px !important; max-height: 52px !important; }
      .mk-navigation { gap: 2px; }
      .mk-header .mk-nav-link { font-size: 20px !important; padding: 0 8px !important; }
      .mk-header .mk-nav-link::after { left: 8px; }
      .mk-header .mk-nav-link:hover::after,
      .mk-header .mk-nav-link.mk-active::after { width: calc(100% - 16px); }
    }

    /* mobile: black menu with red border (old look) */
    @media (max-width: 991px) {
      .mk-header,
      .mk-header-inner,
      .mk-brand { height: 74px; }

      .mk-header-inner { padding: 0 12px; }

      .mk-mobile-button { display: flex; }

      .mk-navigation {
        position: absolute;
        top: 74px;
        left: 0;
        right: 0;
        height: auto;
        max-height: 0;
        overflow: hidden;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        gap: 0;
        background: #000000;
        border: 0 solid #e60000;
        transition: max-height 0.3s ease;
      }

      .mk-navigation.mk-navigation-open {
        max-height: 600px;
        padding: 10px;
        border-width: 2px;
      }

      .mk-header .mk-nav-link {
        width: 100% !important;
        height: 50px;
        justify-content: center;
        padding: 0 16px !important;
        font-size: 22px !important;
        text-shadow: none;
      }

      .mk-header .mk-nav-link::after { display: none; }
    }

    @media (max-width: 575px) {
      .mk-brand { gap: 6px; }
      .mk-header .mk-logo-one { max-width: 70px !important; max-height: 54px !important; }
      .mk-header .mk-logo-two { max-width: 150px !important; max-height: 46px !important; }
      .mk-header .mk-nav-link { font-size: 20px !important; }
    }

  `]
})
export class NavbarComponent {

  isBrowser = false;
  isScrolled = false;
  menuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /* Scroll only changes the header background - logos never change */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) { return; }

    const y = window.scrollY || document.documentElement.scrollTop || 0;
    this.isScrolled = y > 50;
  }

  toggleMobileMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMobileMenu(): void {
    this.menuOpen = false;
  }

}