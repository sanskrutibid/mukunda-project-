import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {

  private readonly siteUrl = 'https://mukundainfraventures.in';
  private readonly siteName = 'Mukunda Infraventures';
  private readonly defaultImage = 'assets/og/home.jpg';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}


  /*
   * seo-data.ts wale har page ke liye.
   * title/description diya ho to wahi badalta hai, baaki page ka purana rehta hai.
   * Phir page ke current title/description se og + twitter tags sync karta hai.
   */
  applyOverrides(
    path: string,
    opts: { title?: string; description?: string; image?: string }
  ): void {

    if (opts.title) {
      this.titleService.setTitle(opts.title);
    }

    if (opts.description) {
      this.metaService.updateTag({ name: 'description', content: opts.description });
    }

    const title = this.titleService.getTitle();
    const description =
      this.metaService.getTag('name="description"')?.content ?? '';

    const url = this.siteUrl + this.cleanPath(path);
    const imagePath = opts.image ?? this.defaultImage;
    const img = this.absoluteImage(imagePath);

    this.writeSocialTags({
      title, description, url, img, imageAlt: title, type: 'website', imagePath
    });

    this.setCanonical(url);
  }


  /* Blog detail jaise pages ke liye (poora data ek saath) */
  setPage(seo: PageSeo): void {

    const url = this.siteUrl + this.cleanPath(seo.path);
    const imagePath = seo.image ?? this.defaultImage;
    const img = this.absoluteImage(imagePath);

    this.titleService.setTitle(seo.title);
    this.metaService.updateTag({ name: 'description', content: seo.description });

    this.writeSocialTags({
      title: seo.title,
      description: seo.description,
      url,
      img,
      imageAlt: seo.imageAlt ?? seo.title,
      type: seo.type ?? 'website',
      imagePath
    });

    this.setCanonical(url);
  }


  private writeSocialTags(o: {
    title: string; description: string; url: string; img: string;
    imageAlt: string; type: string; imagePath: string;
  }): void {

    // Open Graph
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteName });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.metaService.updateTag({ property: 'og:type', content: o.type });
    this.metaService.updateTag({ property: 'og:title', content: o.title });
    this.metaService.updateTag({ property: 'og:description', content: o.description });
    this.metaService.updateTag({ property: 'og:url', content: o.url });
    this.metaService.updateTag({ property: 'og:image', content: o.img });
    this.metaService.updateTag({ property: 'og:image:alt', content: o.imageAlt });

    // Width/height sirf tab jab image sach me 1200x630 ho (assets/og/ folder ki)
    if (o.imagePath.replace(/^\//, '').startsWith('assets/og/')) {
      this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
      this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    } else {
      this.metaService.removeTag('property="og:image:width"');
      this.metaService.removeTag('property="og:image:height"');
    }

    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: o.title });
    this.metaService.updateTag({ name: 'twitter:description', content: o.description });
    this.metaService.updateTag({ name: 'twitter:image', content: o.img });
  }


  setCanonical(url: string): void {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }


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


  private absoluteImage(image: string): string {
    return image.startsWith('http')
      ? image
      : `${this.siteUrl}/${image.replace(/^\//, '')}`;
  }


  private cleanPath(path: string): string {
    const p = (path || '/').split('?')[0].split('#')[0];
    return p.length > 1 ? p.replace(/\/+$/, '') : '/';
  }

}