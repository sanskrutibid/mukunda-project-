import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VmvService } from '../admin/vmv.service';
import { faHome, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe';
import { ImageService } from '../admin/image.service';
import { CarouselImage } from '../admin/image.model';
import { faSeedling, faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  faHome = faHome;
  faCommentDots = faCommentDots;
  chatOpen: boolean = false;  // Ensure it's a boolean and initialized
  @ViewChild('counterSection') counterSection!: ElementRef;

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    console.log('Toggling chat', this.chatOpen);
  }

  // navbar.component.ts
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  constructor(private imageservice: ImageService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  aboutImage: string = 'assets/images/image/u_logo_image.png';
  aboutText: string = '';

  visionText: string = '';
  visionTitle: string = '';
  visionImage: string = 'assets/images/image/Keshavam-City9.jpg';

  missionText: string = '';
  missionTitle: string = '';
  missionImage: string = 'assets/images/image/Dev-Bhoomi-View-3.jpg';

  valuesTitle: string = '';
  valuesText: string = '';
  valuesImage: string = 'assets/images/image/Dev-Bhoomi-View-3.jpg';

  vimeoUrl: string = '';

  carouselImages: { id: number, url: string }[] = [];

  sliderDelay: number = 3000;

  waveText = 'Building Dreams, Creating Legacies';
  showAnimatedText = true;

  // Define the icons
  faSeedling = faSeedling;
  faBuilding = faBuilding;
  faUsers = faUsers;

  // Define the counters
  counters = [
    { target: 10, displayValue: 0, label: 'Residential & Industrial projects developed', icon: this.faSeedling, done: false },
    { target: 2600000, displayValue: 0, label: 'Sq Ft of Development', icon: this.faBuilding, done: false },
    { target: 820, displayValue: 0, label: 'Families Empowered', icon: this.faUsers, done: false }
  ];
  hoveredIndex: number = -1;

  images = [
    { src: 'assets/images/image/karmabhoomi1.PNG', label: 'KARMABHOOMI', link: '/karmabhumi' },
    { src: 'assets/images/image/vraj.jpg', label: 'VRAJ', link: '/vraj' },
    { src: 'assets/images/image/ayodhya.jpeg', label: 'AYODHYA', link: '/ayodhya' },
    { src: 'assets/images/image/dwarka.jpg', label: 'DWARKA', link: '/dwarka' },
    { src: 'assets/images/image/Keshavam-City9.jpg', label: 'MUKUNDA KESHAVAM CITY 9', link: '/keshavam-city-9' },
    { src: 'assets/images/image/Keshavam-City-9.jpg', label: 'MUKUNDA KESHAVAM CITY 10', link: '/keshavam-city-10' }
  ];

  faqs = [
    {
      question: 'What does Mukunda Infraventures offer?',
      answer: 'Mukunda Infraventures offers thoughtfully planned real estate projects designed for residential, commercial, and investment purposes in promising locations.'
    },
    {
      question: 'Where are Mukunda Infraventures projects located?',
      answer: 'Mukunda Infraventures has projects in strategically developing locations, including Hingna, Nagpur, as well as other destinations such as Ayodhya.'
    },
    {
      question: 'How can I get more information about Mukunda Infraventures projects?',
      answer: 'You can contact the Mukunda Infraventures team to learn about available plots, project details, location, pricing, and other relevant information.'
    },
    {
      question: 'What is Karmabhoomi by Mukunda Infraventures?',
      answer: 'Karmabhoomi is a real estate project by Mukunda Infraventures located in Hingna, Nagpur, offering plot options for prospective buyers and investors.'
    },
    {
      question: 'Where is Karmabhoomi located?',
      answer: 'Karmabhoomi is located in the Hingna area of Nagpur, a developing location with access to important roads and surrounding residential and commercial areas.'
    },
    {
      question: 'What is the Ayodhya project by Mukunda Infraventures?',
      answer: 'The Ayodhya project is a real estate offering by Mukunda Infraventures positioned for buyers looking for property opportunities in Nagpur.'
    },
    {
      question: 'What is Vraj by Mukunda Infraventures?',
      answer: 'Vraj is another real estate project offered by Mukunda Infraventures. Interested buyers can contact the company for detailed information about its location, plots, amenities, and availability.'
    },
    {
      question: 'Can I visit the project before making a purchase?',
      answer: 'Yes. Prospective buyers can enquire with Mukunda Infraventures about arranging a project or site visit before making their investment decision.'
    }
  ];



  ngOnInit() {
    this.titleService.setTitle('Explore Real Estate Projects in Nagpur - Mukunda Infraventures');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explore Mukunda Infraventures’ real estate projects in Nagpur and discover properties designed around location, planning, quality and modern lifestyle needs.'
    });
    // Automatically switch to final version after animation (~2.5s)
    const duration = this.waveText.length * 100 + 1000; // delay + animation duration
    setTimeout(() => {
      this.showAnimatedText = false;
    }, duration);

    //about section
    const storedText = localStorage.getItem('aboutText');
    const storedImage = localStorage.getItem('aboutImage');

    this.aboutText = storedText || 'Mukunda Infraventure & Projects Pvt. Ltd, we don’t just build properties — we craft living experiences. With a legacy of trust and excellence, we specialize in delivering thoughtfully designed residential and commercial spaces that reflect innovation, quality, and sustainability. Whether you are a first-time homebuyer or a seasoned investor, our mission is to turn your real estate goals into reality. Every project we undertake is driven by passion, precision, and a commitment to exceed expectations — because your dream deserves more than just a building it deserves a foundation of trust.'
    if (storedImage) this.aboutImage = storedImage;

    //vision section
    const storedvisionTitle = localStorage.getItem('visionTitle');
    const storedvisionText = localStorage.getItem('visionText');
    const storedvisionImage = localStorage.getItem('visionImage');

    this.visionTitle = storedvisionTitle || 'Our Vision';
    this.visionText = storedvisionText ||
      'At Mukunda Infraventures & Projects Private Limited, our vision is to revolutionize real estate experiences with values by combining innovative solutions with unwavering integrity. We are committed to transforming properties into thriving communities, ensuring exceptional value for our clients and stakeholders. we aspire to be the preferred choice in real estate, setting new standards  the future of urban living.';
    this.visionImage = storedvisionImage || 'assets/images/image/Dev-Bhoomi-View-3.jpg';

    // Mission section
    const storedMissionTitle = localStorage.getItem('missionTitle');
    const storedMissionText = localStorage.getItem('missionText');
    const storedMissionImage = localStorage.getItem('missionImage');

    this.missionTitle = storedMissionTitle || 'Our Mission';
    this.missionText = storedMissionText ||
      'At Mukunda Infraventures & Projects Private Limited, Our mission is to deliver high-quality, affordable, and thoughtfully designed real estate solutions that exceed expectations. With a commitment to timely delivery and customer satisfaction, we aim to redefine the urban living experience. We focus on enhancing lifestyles through intelligent planning, and a deep understanding of our clients’ needs and aspirations.';
    this.missionImage = storedMissionImage || 'assets/images/image/Dev-Bhoomi-View-3.jpg';

    //Values Section
    const storedValuesTitle = localStorage.getItem('valuesTitle');
    const storedValuesText = localStorage.getItem('valuesText');
    const storedValuesImage = localStorage.getItem('valuesImage');

    this.valuesTitle = storedValuesTitle || 'Our Values';
    this.valuesText = storedValuesText ||
      'Integrity: We act with honesty and transparency in all our dealings. Innovation: We embrace change and strive for continuous improvement. Quality: We deliver excellence in every square foot we build. Sustainability:We build responsibly with future in mind. Customer-Centricity: Our clients are at the core of our business; their dreams shape our direction.';
    this.valuesImage = storedValuesImage || 'assets/images/image/Dev-Bhoomi-View-3.jpg';

    //video Section
    // const stored = localStorage.getItem('vimeoVideoUrl');
    // this.vimeoUrl = 'assets/vedio/Karma_bhoomi.mp4';

    this.vimeoUrl = `assets/vedio/Karmabhumi.mp4`;

    //carousel section
    this.carouselImages = this.imageservice.getImages() || [];


    this.trackPageVisit('Home');

    const storedImages = localStorage.getItem('carouselImages');
    if (storedImages) {
      this.carouselImages = JSON.parse(storedImages);
    } else {
      // Default images if none are found in localStorage
      this.carouselImages = [
        { id: Date.now(), url: '/assets/images/image/carousel-1.jpg' },
        { id: Date.now(), url: '/assets/images/image/carousel-2.jpg' },
        { id: Date.now(), url: '/assets/images/image/carousel-3.jpg' }
      ];
    }

    this.addFaqSchema();
  }

  addFaqSchema(): void {
    if (document.getElementById('faq-schema-script')) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.id = 'faq-schema-script';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }

  ngOnDestroy(): void {
    const existingScript = document.getElementById('faq-schema-script');
    if (existingScript) {
      existingScript.remove();
    }
  }

  startCounters() {
    this.counters.forEach((counter) => {
      counter.displayValue = 0; // Ensure it's reset
      counter.done = false;     // Reset the done flag
      this.animateCounter(counter);
    });
  }

  animateCounter(counter: { target: number; displayValue: number; done?: boolean }) {
    const duration = 2000;
    const steps = 100;
    const increment = counter.target / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      counter.displayValue += increment;
      currentStep++;

      if (currentStep >= steps) {
        clearInterval(interval);
        counter.displayValue = counter.target;
        counter.done = true; // Mark this counter as done
      }
    }, duration / steps);

    // document.getElementsByTagName("h1")[0].style.fontSize = "6vw";
  }


  showLearnMore = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      this.showLearnMore = rect.top <= window.innerHeight / 1.5;
    }
  }

  scrollToMore() {
    // Example: scrolls to a "more-details" div
    const more = document.getElementById('more-details');
    more?.scrollIntoView({ behavior: 'smooth' });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Create a FileReader to read the image file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result; // Get the base64 image
        const newImage = { id: Date.now(), url: base64Image };
        this.carouselImages.push(newImage); // Add the new image to the array
      };
      reader.readAsDataURL(file); // Read the file as a base64 URL
    }
  }

  // Save the updated carousel images to localStorage
  saveImage(): void {
    localStorage.setItem('carouselImages', JSON.stringify(this.carouselImages));
    alert('Image saved successfully!');
  }


  trackPageVisit(pageName: string): void {
    const visits = JSON.parse(localStorage.getItem('pageVisits') || '{}');
    visits[pageName] = (visits[pageName] || 0) + 1;
    localStorage.setItem('pageVisits', JSON.stringify(visits));
  }

  ngAfterViewInit(): void {
    // Navbar scroll behavior
    const nav = document.querySelector(".navbar");
    window.onscroll = () => {
      if (document.documentElement.scrollTop > 20) {
        nav?.classList.add("header-scrolled");
      } else {
        nav?.classList.remove("header-scrolled");
      }
    };

    // Collapse navbar on link click
    const navBar = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector("#navbarNav");

    navBar.forEach(link => {
      link.addEventListener("click", () => {
        navCollapse?.classList.remove("show");
      });
    });
    //for counting section everytime counting start when page reload
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounters();
          observer.unobserve(entry.target); // Run only once
        }
      });
    }, { threshold: 0.3 });

    if (this.counterSection) {
      observer.observe(this.counterSection.nativeElement);
    }

    this.resetCounters();
    this.startCounters();


    const delay = localStorage.getItem('sliderDelay');
    if (delay) {
      this.sliderDelay = +delay;
    }

  }

  resetCounters() {
    this.counters.forEach(counter => {
      counter.displayValue = 0;
    });
  }

}