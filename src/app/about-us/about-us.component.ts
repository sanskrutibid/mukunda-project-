import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import {
  Meta,
  Title
} from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

import {
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent
  implements OnInit {

  isBrowser: boolean;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.isBrowser =
      isPlatformBrowser(
        this.platformId
      );
  }

  ngOnInit(): void {

    this.titleService.setTitle(
      'About Mukunda Infraventures - Trusted Real Estate Developer'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Learn more about Mukunda Infraventures, our vision and commitment to real estate development. Explore what makes us a trusted property company in Nagpur.'
    });
  }

  aboutText =
    'Mukunda Infraventures & Projects Private Limited, a premier real estate firm in Nagpur, specializes in extensive land-focused projects covering over 150 acres of development. Renowned for our expertise in creating exceptional residential townships, industrial parks, and gated housing complexes, we boast a portfolio exceeding 5 million square feet of current project developments. Our successful ventures include landmark projects along Samruddhi Mahamarg, Wardha Road, and Bhandara Road, showcasing our unwavering commitment to delivering superior quality housing developments built to the highest standards.';

  aboutImage: string =
    'assets/images/image/u_logo_image.png';

  isMenuOpen = false;

  faArrowRight = faArrowRight;

  isHeaderScrolled = false;

  toggleMenu() {
    this.isMenuOpen =
      !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  showLearnMore = false;

  @HostListener(
    'window:scroll',
    []
  )
  onScroll(): void {

    if (!this.isBrowser) {
      return;
    }

    const aboutSection =
      document.getElementById(
        'about'
      );

    if (aboutSection) {

      const rect =
        aboutSection.getBoundingClientRect();

      this.showLearnMore =
        rect.top <=
        window.innerHeight / 1.5;
    }
  }

  scrollToMore() {

    if (!this.isBrowser) {
      return;
    }

    const more =
      document.getElementById(
        'more-details'
      );

    more?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}