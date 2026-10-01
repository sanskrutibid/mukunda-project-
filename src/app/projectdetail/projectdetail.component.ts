import { CommonModule, DOCUMENT } from '@angular/common';

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faRulerCombined, faStar, faMapMarkerAlt, faIndustry } from '@fortawesome/free-solid-svg-icons';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Meta, Title } from '@angular/platform-browser';

@Component({

  selector: 'app-projectdetail',

  imports: [CommonModule, RouterModule, FontAwesomeModule],

  templateUrl: './projectdetail.component.html',

  styleUrl: './projectdetail.component.css'

})

export class ProjectdetailComponent implements OnInit, OnDestroy {

  faRulerCombined = faRulerCombined;  // for Acres

  faStar = faStar;                    // for Amenities

  faMapMarkerAlt = faMapMarkerAlt;

  faIndustry = faIndustry;

  faArrowRight = faArrowRight;

  private readonly breadcrumbScriptId = 'breadcrumb-schema-script';

  private readonly heroPreloadId = 'hero-preload-link';

  // Must match the background-image used in the banner section of the template
  private readonly heroImage = 'assets/images/image/carousel-3.jpg';


  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}


  ngOnInit(): void {

    this.titleService.setTitle(
      'Upcoming & Ongoing Projects in Nagpur | Mukunda Infraventures'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'View Mukunda Infraventures projects across Nagpur and learn about locations, development plans and property opportunities suited to different investment needs.'
    });

    this.addBreadcrumbSchema();

    this.preloadHeroImage();

  }


  /*
   * The banner is a CSS background image, which the browser only
   * discovers late. A high-priority preload starts the download
   * early, which improves LCP. Uses DOCUMENT, so it is SSR-safe.
   */
  private preloadHeroImage(): void {

    if (this.document.getElementById(this.heroPreloadId)) {
      return;
    }

    const link = this.document.createElement('link');

    link.id = this.heroPreloadId;
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/' + this.heroImage;
    link.setAttribute('fetchpriority', 'high');

    this.document.head.appendChild(link);

  }


  /*
   * BreadcrumbList JSON-LD. Matches the visible breadcrumb
   * in the template: Home > Projects.
   * Uses the injected DOCUMENT, so it is safe with SSR.
   */
  private addBreadcrumbSchema(): void {

    if (this.document.getElementById(this.breadcrumbScriptId)) {
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://mukundainfraventures.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Projects',
          'item': 'https://mukundainfraventures.in/projects'
        }
      ]
    };

    const script = this.document.createElement('script');

    script.id = this.breadcrumbScriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    this.document.head.appendChild(script);

  }


  ngOnDestroy(): void {

    this.document.getElementById(this.breadcrumbScriptId)?.remove();

    this.document.getElementById(this.heroPreloadId)?.remove();

  }

}