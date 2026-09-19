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

  readonly faqs: FaqItem[] = [
    {
      question: 'What projects can I explore from Mukunda Infraventures?',
      answer:
        'Mukunda Infraventures offers a range of plotted developments, including Karmabhoomi, Dwaraka, Ayodya, Vraj, and Govardhan.',
    },
    {
      question: 'What makes Karmabhoomi a distinct plotted development?',
      answer:
        'Karmabhoomi is planned as a plotted development for buyers looking for a well-organised land parcel with suitable residential development potential.',
    },
    {
      question: 'Who can consider Dwaraka for their property requirements?',
      answer:
        'Dwaraka can be explored by buyers looking for a plotted property option and seeking a project that aligns with their preferred location, plot size, and development requirements.',
    },
    {
      question: 'What can buyers expect when exploring Ayodya?',
      answer:
        'Ayodya offers another plotted development option within the Mukunda Infraventures portfolio, allowing buyers to evaluate land based on their individual residential requirements.',
    },
    {
      question: 'How does Vraj add to Mukunda Infraventures’ project portfolio?',
      answer:
        'Vraj expands the portfolio with another thoughtfully planned plotted development, giving buyers an additional option to consider when exploring land opportunities.',
    },
    {
      question: 'Why should buyers explore Govardhan before choosing a plot?',
      answer:
        'Govardhan provides buyers with another project option to compare based on location, plot configuration, connectivity, infrastructure, and their intended use of the property.',
    },
    {
      question: 'Are Karmabhoomi, Dwaraka, Ayodya, Vraj, and Govardhan the same type of project?',
      answer:
        'Although all five are part of Mukunda Infraventures’ plotted-development portfolio, each project can differ in terms of its location, layout, plot options, infrastructure, and surrounding development.',
    },
    {
      question: 'How can I compare these five Mukunda Infraventures projects?',
      answer:
        'You can compare Karmabhoomi, Dwaraka, Ayodya, Vraj, and Govardhan by looking at factors such as location, plot dimensions, accessibility, available infrastructure, approvals, and current availability.',
    },
    {
      question: 'Which Mukunda project should I visit for my plot requirements?',
      answer:
        'The suitable project depends on your preferred location, plot requirements, budget, and intended use. You can explore Karmabhoomi, Dwaraka, Ayodya, Vraj, and Govardhan before finalising your choice.',
    },
    {
      question: 'How can I get more details about Karmabhoomi, Dwaraka, Ayodya, Vraj, and Govardhan?',
      answer:
        'You can explore the respective project details on the Mukunda Infraventures website or contact the team for information about plot availability, pricing, specifications, and site visits.',
    },
  ];

  ngOnInit(): void {
    // Page title and description for search engines (edit the text if you like)
    this.titleService.setTitle('FAQs | Mukunda Infraventures - Plotted Developments in Nagpur');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Answers about Mukunda Infraventures plotted developments in Nagpur: Karmabhoomi, Dwaraka, Ayodya, Vraj and Govardhan. Compare projects and plan a site visit.',
    });

    this.addFaqSchema();
  }

  ngOnDestroy(): void {
    // remove the schema script when leaving the page
    this.schemaScript?.remove();
  }

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  /** Adds FAQ structured data (JSON-LD) to the page head. */
  private addFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
    this.schemaScript = script;
  }
}