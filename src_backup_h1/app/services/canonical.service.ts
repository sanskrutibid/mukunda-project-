import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {

  private readonly baseUrl = 'https://mukundainfraventures.in';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  init(): void {

    // Update canonical whenever Angular navigation completes
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(event => {
        this.setCanonical(event.urlAfterRedirects);
      });

    // Set canonical for the initial route.
    // This also runs during SSR/prerendering.
    this.setCanonical(this.router.url);
  }

  private setCanonical(url: string): void {

    const cleanPath = this.cleanUrl(url);

    const canonicalUrl =
      cleanPath === '/'
        ? this.baseUrl + '/'
        : this.baseUrl + cleanPath;

    let canonicalLink =
      this.document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      );

    // Create canonical tag if it does not already exist
    if (!canonicalLink) {

      canonicalLink = this.document.createElement('link');

      canonicalLink.setAttribute(
        'rel',
        'canonical'
      );

      canonicalLink.setAttribute(
        'data-dynamic-canonical',
        'true'
      );

      this.document.head.appendChild(canonicalLink);
    }

    // Update canonical URL
    canonicalLink.setAttribute(
      'href',
      canonicalUrl
    );
  }

  private cleanUrl(url: string): string {

    // Remove query parameters and hash
    let path = url
      .split('?')[0]
      .split('#')[0];

    // Make sure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Remove trailing slash except homepage
    if (path !== '/') {
      path = path.replace(/\/+$/, '');
    }

    return path || '/';
  }
}