import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  selector: 'app-home',
  imports: [FontAwesomeModule, CommonModule, NgClass, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

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

  /* Fix pack block 4: counters render their FINAL value in the HTML
     (prerendered page and Google see the real number, never 0).
     CONFIRM WITH CLIENT: these figures differ from the About page
     ("over 150 acres", "exceeding 5 million sq ft") – owner-inputs item 3. */
  counter1 = 10;
  counter2 = 2.6;
  counter3 = 820;

  vimeoUrl: string = '';

  constructor(
    private el: ElementRef,
    private titleService: Title,
    private metaService: Meta,
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

  // Project Overview (fix pack block 7): the buttons are tabs, they only
  // switch the picture. The "Explore <project> →" link on the picture
  // opens that project's page.
  setActive(index: number) {
    this.activeIndex = index;
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

  // Count-up animation from 0 removed (fix pack block 4: never animate from 0).
}