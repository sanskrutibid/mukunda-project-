import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

interface FaqItem {
  question: string;
  answer: string;
}

interface ProjectLink {
  name: string;
  link: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, OnDestroy {

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private schemaScript?: HTMLScriptElement;


  /** index of the open question (null = all closed). First one is open by default. */
  openIndex: number | null = 0;


  /** Links shown under the FAQ list. Change the routes if yours are different. */
  readonly projects: ProjectLink[] = [
    { name: 'Karmabhoomi', link: '/karmabhumi' },
    { name: 'Dwaraka', link: '/dwarka' },
    { name: 'Ayodya', link: '/ayodhya' },
    { name: 'Vraj', link: '/vraj' },
    { name: 'Govardhan', link: '/projects' },
  ];


  /**
   * Frequently Asked Questions
   */
  readonly faqs: FaqItem[] = [

    {
      question:
        'Which is the best area to buy a residential plot in Nagpur?',

      answer:
        'There is no single area that suits every buyer. It depends on your budget, preferred location and plans for the property. Look at road connectivity, nearby schools and markets, upcoming infrastructure and development in the surrounding area before making a decision.',
    },


    {
      question:
        'What is the price of residential plots in Nagpur per sq ft?',

      answer:
        'Plot prices can differ considerably across Nagpur. Factors such as location, road access, plot dimensions, development around the property and approvals can influence the rate. Comparing a few properties in the same locality can give you a better idea of the current market price.',
    },


    {
      question:
        'How do I check if a plot project is RERA registered?',

      answer:
        "You can visit the official MahaRERA portal and search for the project or developer's name. Check the registration number, project details and approval information shown on the portal before proceeding with a purchase.",
    },


    {
      question:
        'What is the difference between NMRDA and NIT approved plots?',

      answer:
        'NMRDA and NIT are separate planning authorities, and their jurisdiction depends on the location of the property. The important thing for a buyer is to check which authority applies to the particular plot and verify the approved layout and required permissions.',
    },


    {
      question:
        'Can I get a bank loan for a residential plot in Nagpur?',

      answer:
        "Yes, banks and other lenders may provide loans for residential plots, subject to their eligibility requirements. Your income, credit profile, property documents, layout approval and the lender's policies can all affect the loan decision.",
    },


    {
      question:
        'Which documents should I check before buying a plot?',

      answer:
        'Before buying, check the ownership and title documents, previous sale records, approved layout, applicable permissions, property tax records and encumbrance details. Having the documents reviewed by a property lawyer can also help identify potential issues before you commit.',
    },


    {
      question:
        'What plot sizes are available at Mukunda projects?',

      answer:
        'Available plot sizes depend on the individual project and current inventory. For the latest sizes, availability and project-specific details, you can contact Mukunda Infraventures directly.',
    },


    {
      question:
        'Is a plot near MIHAN or on Wardha Road a better investment?',

      answer:
        'Both locations have different characteristics and development patterns. Rather than choosing only by location name, compare connectivity, nearby development, accessibility, pricing, approvals and how well the property matches your long-term plans.',
    },


    {
      question:
        'How do I book a site visit?',

      answer:
        'You can contact the Mukunda Infraventures team through the website to request a site visit. The team can provide available timings, explain the project details and help you with directions to the site.',
    }

  ];


  ngOnInit(): void {

    // Page title and description for search engines
    this.titleService.setTitle(
      'FAQs | Mukunda Infraventures - Plotted Developments in Nagpur'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Find answers about buying residential plots in Nagpur, plot prices, RERA registration, NMRDA and NIT approvals, plot loans, documents, Mukunda projects and site visits.'
    });


    // Add FAQ structured data
    this.addFaqSchema();
  }


  ngOnDestroy(): void {

    // Remove the schema script when leaving the page
    this.schemaScript?.remove();

  }


  toggle(index: number): void {

    this.openIndex =
      this.openIndex === index
        ? null
        : index;

  }


  /** Adds FAQ structured data (JSON-LD) to the page head. */
  private addFaqSchema(): void {

    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',

      mainEntity: this.faqs.map((f) => ({

        '@type': 'Question',

        name: f.question,

        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }

      }))

    };


    const script = this.document.createElement('script');

    script.type = 'application/ld+json';

    script.text = JSON.stringify(data);

    this.document.head.appendChild(script);

    this.schemaScript = script;

  }

}