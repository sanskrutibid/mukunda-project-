import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * ONE FILE FOR ALL SCHEMA
 * -----------------------
 * Use in any page component:
 *   constructor(private schema: SchemaService) {}
 *   ngOnInit() { this.schema.setHome(); }
 *
 * Works with SSR/prerender (uses DOCUMENT, not window).
 */

const SITE = 'https://mukundainfraventures.in';
const ORG_ID = `${SITE}/#organization`;

export interface ProjectInput {
  name: string;          // e.g. 'Keshavam City 9'
  slug: string;          // e.g. 'keshavam-city-9'  -> /keshavam-city-9
  description: string;
  image: string;         // absolute URL
  locality: string;      // e.g. 'Dwarka'
  region?: string;       // e.g. 'Maharashtra'
  priceFrom?: number;    // ONLY pass after client confirms a publishable price band
  priceTo?: number;
}

export interface FaqItem {
  question: string;
  answer: string;        // must match the visible text on the page
}

// =====================================================
// CENTRAL DATA: yahin sab edit karo (naya page/project = ek entry)
// =====================================================

/** Inner pages ke naam (jo yahan nahi honge unka naam URL se ban jayega) */
const PAGE_NAMES: Record<string, string> = {
  '/discover': 'Discover',
  '/aboutus': 'About Us',
  '/projects': 'Projects',
  '/contacts': 'Contact Us',
  '/blog': 'Blog',
  '/career': 'Career',
  '/location': 'Location',
  '/location/plots-in-nagpur': 'Plots in Nagpur',
  '/location/warehouses-in-nagpur': 'Warehouses in Nagpur',
};

/** In URLs par koi schema nahi lagega (private / noindex pages) */
const NO_SCHEMA_PREFIXES = ['/admin', '/login'];

/** Har project ki ek entry. priceFrom TABHI add karo jab client confirm kare */
const PROJECTS: ProjectInput[] = [
  {
    name: 'Keshavam City 7',
    slug: 'keshavam-city-7',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-keshavam-city-7.jpg`,
    locality: 'TODO',
  },
  {
    name: 'Karmabhumi',
    slug: 'karmabhumi',
    description: 'Industrial plots.', // sirf industrial, residential nahi
    image: `${SITE}/assets/TODO-karmabhumi.jpg`,
    locality: 'TODO',
  },
  {
    name: 'Vraj',
    slug: 'vraj',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-vraj.jpg`,
    locality: 'TODO',
  },
  {
    name: 'Ayodhya',
    slug: 'ayodhya',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-ayodhya.jpg`,
    locality: 'TODO',
  },
  {
    name: 'Dwarka',
    slug: 'dwarka',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-dwarka.jpg`,
    locality: 'TODO',
  },
  {
    name: 'Keshavam City 9',
    slug: 'keshavam-city-9',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-keshavam-city-9.jpg`,
    locality: 'TODO',
    // priceFrom: 0,  // client confirm kare tabhi
  },
  {
    name: 'Keshavam City 10',
    slug: 'keshavam-city-10',
    description: 'TODO: description',
    image: `${SITE}/assets/TODO-keshavam-city-10.jpg`,
    locality: 'TODO',
  },
];

/** FAQ page ke questions (page par dikhne wale text jaisa hi rakho) */
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'TODO: question?',
    answer: 'TODO: answer',
  },
  // Karmabhumi: sirf industrial plots, residential nahi
];

@Injectable({ providedIn: 'root' })
export class SchemaService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  // ---------- PUBLIC METHODS (call these from pages) ----------

  /** Homepage ONLY: the RealEstateAgent / organization block */
  setHome(): void {
    this.render('organization', {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      '@id': ORG_ID,
      name: 'Mukunda Infra Ventures',          // TODO: confirm exact name
      url: `${SITE}/`,
      logo: `${SITE}/assets/logo.png`,          // TODO: real logo path
      telephone: '+91-XXXXXXXXXX',              // TODO
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'TODO',
        addressLocality: 'Nagpur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    });
    this.clear('breadcrumb');
    this.clear('project');
    this.clear('faq');
  }

  /** Every NON-home page: breadcrumb only (no RealEstateAgent copy) */
  setPage(name: string, path: string): void {
    this.clear('organization'); // make sure org block is not on inner pages
    this.clear('project');
    this.clear('faq');
    this.render('breadcrumb', this.breadcrumb([
      { name: 'Home', path: '/' },
      { name, path },
    ]));
  }

  /** Each project page: one block per project (+ breadcrumb) */
  setProject(p: ProjectInput): void {
    const url = `${SITE}/${p.slug}`;
    const data: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description,
      url,
      image: p.image,
      brand: { '@id': ORG_ID },
      areaServed: {
        '@type': 'Place',
        name: p.locality,
        address: {
          '@type': 'PostalAddress',
          addressLocality: p.locality,
          addressRegion: p.region ?? 'Maharashtra',
          addressCountry: 'IN',
        },
      },
    };

    // Offers added ONLY when a confirmed price exists
    if (p.priceFrom) {
      data.offers = p.priceTo
        ? {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: p.priceFrom,
            highPrice: p.priceTo,
          }
        : { '@type': 'Offer', priceCurrency: 'INR', price: p.priceFrom };
    }

    this.clear('organization');
    this.clear('faq');
    this.render('project', data);
    this.render('breadcrumb', this.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: p.name, path: `/${p.slug}` },
    ]));
  }

  /** /faq page: FAQPage + breadcrumb */
  setFaq(items: FaqItem[]): void {
    this.clear('organization');
    this.clear('project');
    this.render('faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(i => ({
        '@type': 'Question',
        name: i.question,
        acceptedAnswer: { '@type': 'Answer', text: i.answer },
      })),
    });
    this.render('breadcrumb', this.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ]));
  }

  // ---------- AUTO MODE: ek hi jagah se sab pages ----------

  /** app.component.ts se har navigation par call hota hai */
  applyForUrl(rawUrl: string): void {
    const path = '/' + rawUrl.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');

    if (NO_SCHEMA_PREFIXES.some(p => path === p || path.startsWith(p + '/'))) {
      return this.clearAll();
    }

    if (path === '/') return this.setHome();
    if (path === '/faq') return this.setFaq(FAQ_ITEMS);

    const project = PROJECTS.find(p => `/${p.slug}` === path);
    if (project) return this.setProject(project);

    // Blog post: /blog/<slug>  -> Home > Blog > <Post title from slug>
    if (path.startsWith('/blog/')) {
      this.clearAll();
      return this.render('breadcrumb', this.breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: this.titleFromPath(path.replace('/blog/', '/')), path },
      ]));
    }

    // Sirf known pages par schema; unknown URL (404) par kuch nahi
    if (PAGE_NAMES[path]) return this.setPage(PAGE_NAMES[path], path);
    this.clearAll();
  }

  private clearAll(): void {
    ['organization', 'breadcrumb', 'project', 'faq'].forEach(k => this.clear(k));
  }

  private titleFromPath(path: string): string {
    return path
      .replace(/^\//, '')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // ---------- INTERNAL HELPERS ----------

  private breadcrumb(crumbs: { name: string; path: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: `${SITE}${c.path === '/' ? '/' : c.path}`,
      })),
    };
  }

  /** Creates or replaces <script id="schema-KEY" type="application/ld+json"> */
  private render(key: string, data: object): void {
    const id = `schema-${key}`;
    let el = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  private clear(key: string): void {
    this.doc.getElementById(`schema-${key}`)?.remove();
  }
}