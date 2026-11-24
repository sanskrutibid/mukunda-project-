import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

/* ------------------------------------------------------------------
 * SEO: page title + meta description for the HOME page (URL: "/")
 * ------------------------------------------------------------------ */
const HOME_TITLE = 'Residential & Industrial Plots in Nagpur | Mukunda';

const HOME_DESCRIPTION =
  'Plots across Nagpur: Karmabhoomi industrial estate on Bhandara Road and residential layouts at Tarodi, Jamtha, Sumthana and Wagdhara. MahaRERA registered projects.';

const HOME_OG_DESCRIPTION =
  'Plots across Nagpur: Karmabhoomi industrial estate on Bhandara Road and residential layouts at Tarodi, Jamtha, Sumthana and Wagdhara.';

@Component({
  selector: 'app-home-office',
  imports: [FontAwesomeModule, CommonModule, NgClass, RouterModule],
  templateUrl: './home-office.component.html',
  styleUrl: './home-office.component.css'
})
export class HomeOfficeComponent implements OnInit, AfterViewInit {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  selectedTab: number = 1; // Default tab is "About"

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  waveText = 'Building Dreams, Creating Legacies';
  showAnimatedText = true;

  activeIndex = 0;

  projectList = [
    { name: 'Karmabhoomi', image: 'assets/images/image/karma-1.webp', link: '/karmabhumi' },
    { name: 'Ayodhya', image: 'assets/images/image/ayodhya-slider.webp', link: '/ayodhya' },
    { name: 'Mukunda Keshavam City 9', image: 'assets/images/image/keshavam-city9.webp', link: '/keshavam-city-9' },
    { name: 'Mukunda Keshavam City 10', image: 'assets/images/image/keshavam-city-7-view-4.webp', link: '/keshavam-city-10' },
    { name: 'Vraj', image: 'assets/images/image/vraj-11.webp', link: '/vraj' },
    { name: 'Dwarka', image: 'assets/images/image/dwar-2.webp', link: '/dwarka' }
  ];

  isBrowser: boolean;

  counter1 = 0;
  counter2 = 0;
  counter3 = 0;

  private animated = false;
  vimeoUrl: string = '';

  constructor(
    private el: ElementRef,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {

    /* ---------- SEO: title + meta description ---------- */
    this.titleService.setTitle(HOME_TITLE);

    this.metaService.updateTag({
      name: 'description',
      content: HOME_DESCRIPTION
    });

    // Share preview (WhatsApp / Facebook / LinkedIn)
    this.metaService.updateTag({
      property: 'og:title',
      content: HOME_TITLE
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: HOME_OG_DESCRIPTION
    });
  }

  // Project Overview: clicking a project opens that project's page
  // (Karmabhoomi -> /karmabhumi, Ayodhya -> /ayodhya, ...)
  setActive(index: number) {
    this.activeIndex = index;
    this.router.navigate([this.projectList[index].link]);
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.projectList.length;
  }

  prevSlide() {
    this.activeIndex =
      (this.activeIndex - 1 + this.projectList.length) % this.projectList.length;
  }

  ngAfterViewInit() {

    // Video autoplay only exists in the browser (not during SSR)
    if (!this.isBrowser || !this.videoPlayer) {
      return;
    }

    const video = this.videoPlayer.nativeElement;

    // Required to meet browser autoplay policy: muted and playsinline
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Force play using JavaScript
    video.play().catch(error => {
      console.warn('Autoplay blocked by browser:', error);

      // Fallback: start on the first click / touch anywhere on the page
      const start = () => {
        video.play().catch(() => {});
        document.removeEventListener('click', start);
        document.removeEventListener('touchstart', start);
      };

      document.addEventListener('click', start);
      document.addEventListener('touchstart', start);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) {
      return;
    }

    if (!this.animated && this.isInViewport()) {
      this.animated = true;
      this.startCount('counter1', 10);
      this.startCount('counter2', 2.6);
      this.startCount('counter3', 820);
    }
  }

  startCount(property: 'counter1' | 'counter2' | 'counter3', target: number) {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      (this as any)[property] = current;

      if (current >= target) {
        (this as any)[property] = target;
        clearInterval(interval);
      }
    }, 30);
  }

  isInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }
}