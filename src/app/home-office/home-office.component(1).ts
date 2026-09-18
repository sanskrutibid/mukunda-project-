import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { NgClass } from '@angular/common';       // ✅ Import this
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home-office',
  imports: [FontAwesomeModule,CommonModule,NgClass,RouterModule],
  templateUrl: './home-office.component.html',
  styleUrl: './home-office.component.css'
})
export class HomeOfficeComponent implements OnInit, AfterViewInit {
    faFacebook = faFacebook;
    faInstagram = faInstagram;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;
    faYoutube = faYoutube;
    selectedTab: number = 1; // Default tab is "Meet Our Founder"

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  waveText = 'Building Dreams, Creating Legacies';
  showAnimatedText = true;


    activeIndex = 0;

    projectList = [
      { name: 'Karmabhoomi', image: 'assets/images/image/Karma-1.jpg', link: '/karmabhumi' },
      { name: 'Ayodhya', image: 'assets/images/image/ayodhya-slider.jpg', link: '/ayodhya' },
      { name: 'Mukunda Keshavam City 9', image: 'assets/images/image/Keshavam-City9.jpg', link: '/keshavam-city-9' },
      { name: 'Mukunda Keshavam City 10', image: 'assets/images/image/Keshavam-City-7-View-4.jpg', link: '/keshavam-city-10' },
       { name: 'Vraj', image: 'assets/images/image/Vraj-11.jpg', link: '/vraj' },
      { name: 'Dwarka', image: 'assets/images/image/Dwar-2.jpg', link: '/dwarka' }
    ];



  ngOnInit(): void {
    this.titleService.setTitle('Commercial Plot in Nagpur | Mukunda Infraventures');

    this.metaService.updateTag({
      name: 'description',
      content: 'Searching for a commercial plot in Nagpur? Invest with Mukunda Infraventures and own a premium commercial space. Call now to book your site visit today!'
    });
  }
    
  
    setActive(index: number) {
      this.activeIndex = index;
    }
  
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.projectList.length;
    }
  
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.projectList.length) % this.projectList.length;
    }

    counter1 = 0;
    counter2 = 0;
    counter3 = 0;
  
    private animated = false;
     vimeoUrl: string = '';

   
  
    constructor(private el: ElementRef,
       private titleService: Title,
    private metaService: Meta
    ) {}
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;

    // Required to meet browser autoplay policy: muted and playsinline
    video.muted = true;
    video.playsInline = true;

    // Force play using JavaScript
    video.play().catch(error => {
      console.warn('Autoplay blocked by browser:', error);
    });
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {
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

