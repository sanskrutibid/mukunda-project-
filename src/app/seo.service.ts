import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeo {
  title: string;        // keep under 60 characters
  description: string;  // keep under 160 characters
  path: string;         // e.g. '/aboutus'  ('/' for home)
  image?: string;       // absolute or site-relative image URL
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {

  private readonly siteUrl = 'https://mukundainfraventures.in';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}


  /* Title + meta description + Open Graph + canonical */
  setPage(seo: PageSeo): void {

    const cleanPath = this.cleanPath(seo.path);
    const url = this.siteUrl + cleanPath;

    this.titleService.setTitle(seo.title);

    this.metaService.updateTag({ name: 'description', content: seo.description });

    this.metaService.updateTag({ property: 'og:title', content: seo.title });
    this.metaService.updateTag({ property: 'og:description', content: seo.description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: seo.type ?? 'website' });

    if (seo.image) {
      const img = seo.image.startsWith('http')
        ? seo.image
        : `${this.siteUrl}/${seo.image.replace(/^\//, '')}`;
      this.metaService.updateTag({ property: 'og:image', content: img });
    }

    this.setCanonical(url);
  }


  /* <link rel="canonical"> */
  setCanonical(url: string): void {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }


  /* JSON-LD structured data. Pass null to remove it. */
  setJsonLd(id: string, data: object | null): void {
    const existing = this.doc.getElementById(id);
    if (existing) {
      existing.remove();
    }

    if (!data) {
      return;
    }

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }


  /* '/aboutus/?x=1#y' -> '/aboutus'   ('' -> '/') */
  private cleanPath(path: string): string {
    const p = (path || '/').split('?')[0].split('#')[0];
    return p.length > 1 ? p.replace(/\/+$/, '') : '/';
  }

}