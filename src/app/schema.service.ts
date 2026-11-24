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
 *
 * NOTE: the sitewide WebSite + RealEstateAgent graph now lives ONCE in
 * src/index.html (so it is on every page). setHome() no longer adds a
 * second organization block.
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

/** Fallback image until each project has its own 1200x630 image: replace per project below */
const DEFAULT_PROJECT_IMAGE = `${SITE}/assets/og/home.jpg`;

/** Har project ki ek entry. priceFrom TABHI add karo jab client confirm kare */
const PROJECTS: ProjectInput[] = [
  {
    name: 'Keshavam City 7',
    slug: 'keshavam-city-7',
    description: 'Sold-out project at Takli near MIHAN, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Takli',
  },
  {
    name: 'Karmabhumi',
    slug: 'karmabhumi',
    description: 'Industrial plots on Bhandara Road, Nagpur.', // sirf industrial, residential nahi
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Mahalgaon',
  },
  {
    name: 'Vraj',
    slug: 'vraj',
    description: 'Residential plots in Jamtha, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Jamtha',
  },
  {
    name: 'Ayodhya',
    slug: 'ayodhya',
    description: 'Residential plots in Tarodi, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Tarodi',
  },
  {
    name: 'Dwarka',
    slug: 'dwarka',
    description: 'Residential plots in Sumthana, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Sumthana',
  },
  {
    name: 'Keshavam City 9',
    slug: 'keshavam-city-9',
    description: 'Plots in Wagdhara, Hingna, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Wagdhara',
    // priceFrom: 0,  // client confirm kare tabhi
  },
  {
    name: 'Keshavam City 10',
    slug: 'keshavam-city-10',
    description: 'Plots in Wagdhara, Hingna, Nagpur.',
    image: DEFAULT_PROJECT_IMAGE,
    locality: 'Wagdhara',
  },
];

/**
 * FAQ page ke questions (page par dikhne wale text jaisa hi rakho).
 * Jab tak yahan real questions nahi hain, /faq par sirf breadcrumb lagega.
 * Karmabhumi: sirf industrial plots, residential nahi
 */
const FAQ_ITEMS: FaqItem[] = [];

@Injectable({ providedIn: 'root' })
export class SchemaService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  // ---------- PUBLIC METHODS (call these from pages) ----------

  /**
   * Homepage ONLY.
   * The RealEstateAgent / organization graph is in src/index.html now,
   * so no second copy is rendered here (it used to hold placeholder data).
   */
  setHome(): void {
    this.clear('organization');
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
    if (path === '/faq') {
      // FAQPage schema only when real FAQ items exist (no placeholder text in schema)
      return FAQ_ITEMS.length ? this.setFaq(FAQ_ITEMS) : this.setPage('FAQ', '/faq');
    }

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