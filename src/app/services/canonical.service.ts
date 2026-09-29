import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {

  private readonly baseUrl = 'https://mukundainfraventures.in';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  init(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Set canonical for the current URL
    this.setCanonical(this.router.url);

    // Update canonical whenever Angular route changes
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

    // Create canonical tag if it does not exist
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('data-dynamic-canonical', 'true');

      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
  }

  private cleanUrl(url: string): string {

    // Remove query parameters and hash
    let path = url.split('?')[0].split('#')[0];

    // Ensure URL starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Remove trailing slash except for homepage
    if (path !== '/') {
      path = path.replace(/\/+$/, '');
    }

    return path || '/';
  }
}